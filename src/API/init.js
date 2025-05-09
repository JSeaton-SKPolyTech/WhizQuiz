import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const {data, error} = await supabase.from('quiz').select();

let exportTest;

if(!error){
	exportTest = data;
}else{
	exportTest = error;
}

export default exportTest;