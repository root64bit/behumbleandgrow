const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://acfjjrupcigwjbqcbonw.supabase.co';
const anonKey = 'sb_publishable_mowxTxhcUduTcIiNs0DyNw_e4Z3-QqI';

const supabase = createClient(supabaseUrl, anonKey);

const TEST_CREDS = [
  { portal: '1. Candidate Workspace', email: 'candidate.test@behumbleandgrow.com', password: 'Password123!' },
  { portal: '2. Recruitment Partner Portal', email: 'recruiter.test@behumbleandgrow.com', password: 'Password123!' },
  { portal: '3. UAE Employer Workspace', email: 'employer.test@behumbleandgrow.com', password: 'Password123!' },
  { portal: '4. Operations Control Console', email: 'ops.test@behumbleandgrow.com', password: 'Password123!' },
  { portal: '5. Super Admin Control Centre', email: 'admin.test@behumbleandgrow.com', password: 'Password123!' },
];

async function testLogins() {
  console.log('=== Testing Real Supabase Auth Login for All 5 Portals ===\n');

  for (const cred of TEST_CREDS) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cred.email,
      password: cred.password
    });

    if (error) {
      console.log(`❌ ${cred.portal}: FAILED - ${error.message}`);
    } else {
      console.log(`✅ ${cred.portal}: SUCCESS! Session user ID = ${data.user.id}`);
      await supabase.auth.signOut();
    }
  }
}

testLogins().catch(console.error);
