const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://acfjjrupcigwjbqcbonw.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZmpqcnVwY2lnd2picWNib253Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDkyNjg4NSwiZXhwIjoyMTAwNTAyODg1fQ.MH4Poph6kA6tQKoxEYYImYj0S9Yl12qcAr2js0jiTNA';

const supabase = createClient(supabaseUrl, serviceRoleKey);

const TEST_ACCOUNTS = [
  {
    email: 'candidate.test@behumbleandgrow.com',
    password: 'Password123!',
    fullName: 'Candidate Test User',
    role: 'candidate',
    meta: { full_name: 'Candidate Test User', role: 'candidate', nationality: 'Kenya', phone: '+254712345678' }
  },
  {
    email: 'recruiter.test@behumbleandgrow.com',
    password: 'Password123!',
    fullName: 'Recruiter Test Partner',
    role: 'recruiter',
    meta: { full_name: 'Recruiter Test Partner', role: 'recruiter' }
  },
  {
    email: 'employer.test@behumbleandgrow.com',
    password: 'Password123!',
    fullName: 'Employer Test Admin',
    role: 'employer_admin',
    meta: { full_name: 'Employer Test Admin', role: 'employer_admin' }
  },
  {
    email: 'ops.test@behumbleandgrow.com',
    password: 'Password123!',
    fullName: 'Operations Test Admin',
    role: 'operations_admin',
    meta: { full_name: 'Operations Test Admin', role: 'operations_admin' }
  },
  {
    email: 'admin.test@behumbleandgrow.com',
    password: 'Password123!',
    fullName: 'Super Admin Test User',
    role: 'super_admin',
    meta: { full_name: 'Super Admin Test User', role: 'super_admin' }
  }
];

async function seedTestAccounts() {
  console.log('=== Verifying & Linking User Roles for 5 Portal Test Accounts ===\n');

  for (const acc of TEST_ACCOUNTS) {
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === acc.email.toLowerCase());

    if (!existingUser) continue;
    const userId = existingUser.id;

    // Insert user_roles if not existing
    const { data: existingRoles } = await supabase.from('user_roles').select('*').eq('profile_id', userId);
    if (!existingRoles || existingRoles.length === 0) {
      const { error: insertRoleErr } = await supabase.from('user_roles').insert({
        profile_id: userId,
        role: acc.role
      });
      if (insertRoleErr) console.error(`  Error inserting role for ${acc.email}:`, insertRoleErr.message);
      else console.log(`  Inserted role '${acc.role}' for ${acc.email}`);
    } else {
      console.log(`  Role '${existingRoles[0].role}' already present for ${acc.email}`);
    }
  }

  console.log('\n=== VERIFICATION FINISHED ===');
}

seedTestAccounts().catch(console.error);
