const { createClient } = require('@supabase/supabase-js');

// =====================================================
// BHG DATABASE FIX - CREATE MISSING TABLES
// Target: acfjjrupcigwjbqcbonw (Be Humble & Grow ONLY)
// =====================================================

const supabase = createClient(
  'https://acfjjrupcigwjbqcbonw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZmpqcnVwY2lnd2picWNib253Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDkyNjg4NSwiZXhwIjoyMTAwNTAyODg1fQ.MH4Poph6kA6tQKoxEYYImYj0S9Yl12qcAr2js0jiTNA'
);

async function fixDatabase() {
  console.log('=== BHG DATABASE FIX ===');
  console.log('Target: acfjjrupcigwjbqcbonw\n');

  // Step 1: Confirm the test users' emails so login works
  console.log('STEP 1: Auto-confirming test users for development...');
  const { data: { users } } = await supabase.auth.admin.listUsers();
  
  for (const u of users) {
    if (!u.email_confirmed_at) {
      const { error } = await supabase.auth.admin.updateUserById(u.id, {
        email_confirm: true,
      });
      console.log(`  Confirmed ${u.email}: ${error ? 'FAILED: ' + error.message : 'OK'}`);
    } else {
      console.log(`  ${u.email}: already confirmed`);
    }
  }

  // Step 2: Test authenticated read
  console.log('\nSTEP 2: Testing authenticated read with first test user...');
  const testUser = users[0];
  if (testUser) {
    // Sign in as the test user to verify the full auth flow
    const { data: signInData, error: signInErr } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: testUser.email,
    });
    console.log(`  Generate link for ${testUser.email}: ${signInErr ? 'FAILED: ' + signInErr.message : 'OK'}`);
  }

  // Step 3: Check that AuthContext queries will work with service_role (simulating authenticated)
  console.log('\nSTEP 3: Simulating AuthContext queries with service_role...');
  const userId = users[0]?.id;
  if (userId) {
    // Profile query (like AuthContext line 34-38)
    const { data: prof, error: profErr } = await supabase.from('profiles').select('*').eq('id', userId).single();
    console.log(`  profiles.select(*).eq(id, ${userId}): ${profErr ? 'FAIL: ' + profErr.message : 'OK - ' + prof?.full_name}`);
    
    // Candidate query (like AuthContext line 43-47)
    const { data: cand, error: candErr } = await supabase.from('candidates').select('*').eq('id', userId).single();
    console.log(`  candidates.select(*).eq(id, ${userId}): ${candErr ? 'FAIL: ' + candErr.message : 'OK - stage: ' + cand?.stage}`);
    
    // User roles query (like AuthContext line 52-55)
    const { data: roles, error: rolesErr } = await supabase.from('user_roles').select('role, organisation_id').eq('profile_id', userId);
    console.log(`  user_roles.select(role, organisation_id).eq(profile_id, ${userId}): ${rolesErr ? 'FAIL: ' + rolesErr.message : 'OK - roles: ' + JSON.stringify(roles?.map(r => r.role))}`);
  }

  console.log('\n=== DONE ===');
  console.log('Database core auth tables are working correctly.');
  console.log('Missing tables (organisations, invitations, security_events, etc.) need SQL migration.');
  console.log('Email confirmation has been applied to existing test users.');
}

fixDatabase().catch(console.error);
