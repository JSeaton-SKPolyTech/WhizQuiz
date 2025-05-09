import { createClient } from '@supabase/supabase-js';

console.log(import.meta.env.VITE_SUPABASE_URL);

// Create a single supabase client for interacting with your database
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

let exportTest;

supabase.from('quiz').select().then(function(res){
	exportTest = res;
}).catch(function(err){
	exportTest = err
});

export default exportTest;