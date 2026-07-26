const { createClient } = require('@supabase/supabase-js');

// =====================================================
// BHG DATABASE FIX SCRIPT
// Target: acfjjrupcigwjbqcbonw (Be Humble & Grow)
// NOT oskgvlwdncqsnoycerud (YAKA)
// =====================================================

const supabase = createClient(
  'https://acfjjrupcigwjbqcbonw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZmpqcnVwY2lnd2picWNib253Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDkyNjg4NSwiZXhwIjoyMTAwNTAyODg1fQ.MH4Poph6kA6tQKoxEYYImYj0S9Yl12qcAr2js0jiTNA'
);

async function testAuthFlow() {
  console.log('=== BHG AUTH FLOW VERIFICATION ===\n');
  console.log('Target: https://acfjjrupcigwjbqcbonw.supabase.co\n');

  // 1. Check if profiles.id maps to auth.users.id
  const { data: { users } } = await supabase.auth.admin.listUsers({ perPage: 5 });
  console.log('--- AUTH USERS ---');
  for (const u of users) {
    console.log(`  Auth ID: ${u.id}`);
    console.log(`  Email: ${u.email}`);
    console.log(`  Confirmed: ${!!u.email_confirmed_at}`);
    console.log(`  Meta: ${JSON.stringify(u.user_metadata)}`);
    
    // Check if profile exists with same ID
    const { data: prof, error: profErr } = await supabase.from('profiles').select('*').eq('id', u.id).single();
    console.log(`  Profile found: ${!!prof} ${profErr ? '(Error: ' + profErr.message + ')' : ''}`);
    if (prof) console.log(`  Profile: ${JSON.stringify(prof)}`);
    
    // Check if candidate exists
    const { data: cand, error: candErr } = await supabase.from('candidates').select('*').eq('id', u.id).single();
    console.log(`  Candidate found: ${!!cand} ${candErr ? '(Error: ' + candErr.message + ')' : ''}`);
    
    // Check if user_role exists
    const { data: roles, error: rolesErr } = await supabase.from('user_roles').select('*').eq('profile_id', u.id);
    console.log(`  Roles found: ${roles?.length || 0} ${rolesErr ? '(Error: ' + rolesErr.message + ')' : ''}`);
    if (roles?.length) console.log(`  Roles: ${JSON.stringify(roles)}`);
    
    console.log('');
  }

  // 2. Test what an authenticated user would see (simulate RLS)
  console.log('--- RLS SIMULATION ---');
  console.log('Testing if anon key can read profiles (should be blocked by RLS)...');
  const anonClient = createClient(
    'https://acfjjrupcigwjbqcbonw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZmpqcnVwY2lnd2picWNib253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MjY4ODUsImV4cCI6MjEwMDUwMjg4NX0.dYBXMNU8bru8oxzux3uLJjy1FCNn4UR0UCVm9TIu73g'
  );
  const { data: anonProfiles, error: anonErr } = await anonClient.from('profiles').select('*').limit(1);
  console.log(`  Anon profiles: ${anonProfiles?.length || 0} rows ${anonErr ? '(Error: ' + anonErr.message + ')' : ''}`);
  
  const { data: anonRoles, error: anonRolesErr } = await anonClient.from('user_roles').select('*').limit(1);
  console.log(`  Anon roles: ${anonRoles?.length || 0} rows ${anonRolesErr ? '(Error: ' + anonRolesErr.message + ')' : ''}`);

  // 3. Check handle_new_user trigger by examining profiles
  console.log('\n--- TRIGGER VERIFICATION ---');
  const { data: allProfiles } = await supabase.from('profiles').select('id, email, full_name, default_role, country_code').order('created_at', { ascending: false });
  console.log(`  Total profiles: ${allProfiles?.length}`);
  
  const { data: allCandidates } = await supabase.from('candidates').select('id, stage, verification_status').order('created_at', { ascending: false });
  console.log(`  Total candidates: ${allCandidates?.length}`);
  
  const { data: allRoles } = await supabase.from('user_roles').select('profile_id, role, organisation_id').order('created_at', { ascending: false });
  console.log(`  Total user_roles: ${allRoles?.length}`);

  // 4. Check missing tables
  console.log('\n--- MISSING TABLES CHECK ---');
  const tables = ['organisations', 'invitations', 'security_events', 'organisation_users', 'recruitment_partners', 'employers', 'jobs', 'lead_assignments', 'applications', 'interviews', 'offers', 'payments', 'refunds', 'status_history', 'audit_logs'];
  for (const t of tables) {
    const { error } = await supabase.from(t).select('*').limit(0);
    console.log(`  ${t}: ${error ? '❌ MISSING (' + error.message.substring(0, 60) + ')' : '✅ EXISTS'}`);
  }
}

testAuthFlow().catch(console.error);
