import { createClient } from '@supabase/supabase-js';

const url = 'https://acfjjrupcigwjbqcbonw.supabase.co';
const key = 'sb_publishable_mowxTxhcUduTcIiNs0DyNw_e4Z3-QqI';

const supabase = createClient(url, key);

async function test() {
  console.log('Testing connection to acfjjrupcigwjbqcbonw...');
  
  const { data: profiles, error: profErr } = await supabase.from('profiles').select('count', { count: 'exact' });
  console.log('Profiles table query:', { data: profiles, error: profErr });

  const { data: candidates, error: candErr } = await supabase.from('candidates').select('count', { count: 'exact' });
  console.log('Candidates table query:', { data: candidates, error: candErr });

  const { data: jobs, error: jobsErr } = await supabase.from('jobs').select('count', { count: 'exact' });
  console.log('Jobs table query:', { data: jobs, error: jobsErr });
}

test();
