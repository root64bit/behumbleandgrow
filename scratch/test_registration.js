import { createClient } from '@supabase/supabase-js';

const url = 'https://acfjjrupcigwjbqcbonw.supabase.co';
const key = 'sb_publishable_mowxTxhcUduTcIiNs0DyNw_e4Z3-QqI';

const supabase = createClient(url, key);

async function testRegistrationAndVerification() {
  const testEmail = `candidate.verified.${Date.now()}@gmail.com`;
  const testPassword = 'Password123!';

  console.log(`Testing registration & auto profile creation for: ${testEmail}`);

  const { data, error } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: {
        full_name: 'Gaspar Test Candidate',
        phone: '+254712345678',
        nationality: 'Kenya',
        residence: 'Kenya',
        role: 'candidate',
      },
    },
  });

  console.log('SignUp Data User ID:', data?.user?.id);
  console.log('SignUp Error:', error);

  if (data?.user?.id) {
    const { data: prof } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id);
    console.log('Auto-created Profile:', prof);

    const { data: cand } = await supabase
      .from('candidates')
      .select('*')
      .eq('id', data.user.id);
    console.log('Auto-created Candidate:', cand);

    const { data: roles } = await supabase
      .from('user_roles')
      .select('*')
      .eq('profile_id', data.user.id);
    console.log('Auto-assigned User Roles:', roles);
  }
}

testRegistrationAndVerification();
