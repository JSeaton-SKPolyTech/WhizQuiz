import supabase from './init';

const getQuiz = async function(){
	supabase.from('quiz').select(`
		quiz_id,
		teacher_id,
		question ( question_id, question, answer ( answer, is_correct ) )
	`).then(function(res){
		return res.data;
	}).catch(function(err){
		return err;
	});
}

const getRoomData = async function(){
	supabase.from('room')
		.select(`*`)
		.eq('room_id', 1)
	.then(function(res){
		return res.data;
	}).catch(function(err){
		return err;
	});
};

export { getQuiz, getRoomData };