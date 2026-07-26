const { Client } = require('pg');
const path = require('path');
const fs = require('fs');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const idx = trimmed.indexOf('=');
        const key = trimmed.substring(0, idx).trim();
        const val = trimmed.substring(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

async function fixAutoConfirmTrigger() {
  console.log('=== Updating Trigger & Auto-confirming Candidate Signups ===\n');

  const password = "Iloveafrica@123";
  const passEnc = encodeURIComponent(password);
  const connStr = `postgresql://postgres.acfjjrupcigwjbqcbonw:${passEnc}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`;

  const client = new Client({
    connectionString: connStr,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected to Supabase DB via PostgreSQL pooler!\n');

    // 1. Auto confirm all existing users in auth.users
    console.log('1. Auto-confirming all users in auth.users...');
    await client.query(`
      UPDATE auth.users 
      SET email_confirmed_at = COALESCE(email_confirmed_at, NOW()) 
      WHERE email_confirmed_at IS NULL;
    `);
    console.log('   Users auto-confirmed successfully!\n');

    // 2. Update handle_new_user() trigger to auto-confirm email for candidate signups
    console.log('2. Updating handle_new_user() trigger to auto-confirm signups...');
    const triggerSql = `
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS TRIGGER AS $$
      BEGIN
        -- Auto-confirm candidate email so immediate login works seamlessly
        UPDATE auth.users
        SET email_confirmed_at = COALESCE(email_confirmed_at, NOW())
        WHERE id = NEW.id AND email_confirmed_at IS NULL;

        -- Insert into public.profiles
        INSERT INTO public.profiles (id, email, full_name, phone, country_code, default_role, status)
        VALUES (
          NEW.id,
          NEW.email,
          COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
          COALESCE(NEW.raw_user_meta_data->>'phone', ''),
          COALESCE(NEW.raw_user_meta_data->>'country_code', 'MOZ'),
          COALESCE(NEW.raw_user_meta_data->>'role', 'candidate'),
          'active'
        )
        ON CONFLICT (id) DO UPDATE SET
          full_name = EXCLUDED.full_name,
          phone = EXCLUDED.phone,
          default_role = EXCLUDED.default_role,
          updated_at = NOW();

        -- Insert into candidates if role is candidate (or default)
        IF (NEW.raw_user_meta_data->>'role' IS NULL OR NEW.raw_user_meta_data->>'role' = 'candidate') THEN
          INSERT INTO public.candidates (id, stage, verification_status)
          VALUES (NEW.id, 'registered', 'pending')
          ON CONFLICT (id) DO NOTHING;

          INSERT INTO public.user_roles (profile_id, role)
          VALUES (NEW.id, 'candidate')
          ON CONFLICT DO NOTHING;
        END IF;

        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;

    await client.query(triggerSql);
    console.log('   Trigger handle_new_user updated successfully!\n');

  } catch (err) {
    console.error('❌ Trigger update error:', err.message);
  } finally {
    await client.end();
  }
}

fixAutoConfirmTrigger().catch(console.error);
