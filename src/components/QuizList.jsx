import { useEffect, useRef, useState } from "react";

import supabase from '../API/init';
import { useNavigate } from "react-router-dom";

const QuizList = function({className=''}){
	const [quizList, setQuizList] = useState([]);
	const calledAPI = useRef(false);
	const navigator = useNavigate();

	function goToQuiz(quizId){
		navigator(`/quiz/${quizId}`);
	}
	
	useEffect(function(){
		if(!calledAPI.current){
			supabase.from('quiz').select(`quiz_id, quiz_name`).eq('teacher_id', sessionStorage.getItem('userId')).then(function(data){
				setQuizList(data.data);
				console.log(data);
			}).catch(function(error){
				console.log(error);
			});
			calledAPI.current = true;
		}
	}, []);
	
	return (
		<div className={`white-background ${className}`}>
			<h2>Your Quizes</h2>
			<ul className="quiz-list">
				{quizList.map(function(title, index){
					return (
						<li className="quiz-list-item" key={index} onClick={()=>{goToQuiz(title.quiz_id)}} >{title.quiz_name}</li>
					)
				})}
			</ul>
		</div>
	)
}

export default QuizList;