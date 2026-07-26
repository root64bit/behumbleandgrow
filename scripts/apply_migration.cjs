const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

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

async function applyMigration() {
  console.log('=== Applying Missing Tables to BHG (acfjjrupcigwjbqcbonw) ===\n');

  const password = "Iloveafrica@123";
  const passEnc = encodeURIComponent(password);
  const projectRef = "acfjjrupcigwjbqcbonw";

  const poolerHosts = [
    'aws-0-eu-west-1.pooler.supabase.com',
    'aws-0-eu-central-1.pooler.supabase.com',
    'aws-0-us-east-1.pooler.supabase.com',
    'aws-0-us-west-1.pooler.supabase.com',
    'aws-0-ap-southeast-1.pooler.supabase.com',
    'aws-0-sa-east-1.pooler.supabase.com'
  ];

  let client = null;
  let connected = false;

  for (const host of poolerHosts) {
    for (const port of [6543, 5432]) {
      const connStr = `postgresql://postgres.${projectRef}:${passEnc}@${host}:${port}/postgres`;
      try {
        console.log(`Connecting to ${host}:${port}...`);
        const c = new Client({
          connectionString: connStr,
          connectionTimeoutMillis: 5000,
          ssl: { rejectUnauthorized: false }
        });
        await c.connect();
        client = c;
        connected = true;
        console.log(`✅ Connected successfully to ${host}:${port}!\n`);
        break;
      } catch (err) {
        console.log(`  Failed: ${err.message}`);
      }
    }
    if (connected) break;
  }

  if (!connected || !client) {
    console.error('\n❌ Could not find active Supabase pooler host.');
    return;
  }

  try {
    const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '20260725000003_create_missing_tables.sql');
    console.log(`Reading migration file: ${sqlPath}`);
    const migrationSql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Executing migration script...');
    await client.query(migrationSql);
    console.log('🎉 Migration executed successfully!\n');

    // Verify created tables
    const res = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      ORDER BY tablename;
    `);

    console.log('--- ALL PUBLIC TABLES IN DATABASE ---');
    res.rows.forEach(r => console.log(`  - ${r.tablename}`));

  } catch (err) {
    console.error('❌ Database migration error:', err.message);
  } finally {
    await client.end();
  }
}

applyMigration().catch(console.error);
