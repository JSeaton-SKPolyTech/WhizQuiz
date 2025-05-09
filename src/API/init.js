import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

let exportTest;

supabase.from('quiz').select().then(function(res){
	exportTest = res;
}).catch(function(err){
	exportTest = err
});

export default exportTest;