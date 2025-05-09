import { createClient } from '@supabase/supabase-js';

console.log(import.meta.env.VITE_SUPABASE_URL);

// Create a single supabase client for interacting with your database
const supabase = createClient('https://ptkivpyavmxsvoiuppgl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0a2l2cHlhdm14c3ZvaXVwcGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3Mzc2MDQsImV4cCI6MjA2MjMxMzYwNH0.aKUMUuxIMupV7dI94qaKhi9eKUiNC0htzA18KquQE4U');

let exportTest;

supabase.from('quiz').select().then(function(res){
	exportTest = res;
}).catch(function(err){
	exportTest = err
});

export default exportTest;