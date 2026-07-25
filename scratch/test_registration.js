import { createClient } from '@supabase/supabase-js';

const url = 'https://acfjjrupcigwjbqcbonw.supabase.co';
const key = 'sb_publishable_mowxTxhcUduTcIiNs0DyNw_e4Z3-QqI';

const supabase = createClient(url, key);

async function testRegistrationWithCustomSmtp() {
  const testEmail = `candidate.smtp.test.${Date.now()}@gmail.com`;
  const testPassword = 'Password123!';

  console.log(`Testing candidate registration with Custom SMTP for: ${testEmail}`);

  const { data, error } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: {
        full_name: 'Custom SMTP Candidate',
        phone: '+254712345678',
        nationality: 'Kenya',
        residence: 'Kenya',
        role: 'candidate',
      },
    },
  });

  console.log('SignUp Result Data User ID:', data?.user?.id);
  console.log('SignUp Result Session:', data?.session ? 'Active Session' : 'Email Confirmation Sent');
  console.log('SignUp Error:', error);

  if (data?.user?.id) {
    const { data: prof } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id);
    console.log('PostgreSQL Profile Verification:', prof);
  }
}

testRegistrationWithCustomSmtp();
