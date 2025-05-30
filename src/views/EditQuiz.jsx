import { useEffect, useRef, useState } from "react";

import supabase from "../API/init";
import { Button, NotLoggedIn, TeacherNav, LabelledInput } from "../components";
import { useParams } from "react-router-dom";

const EditQuiz = function(){

	let loggedIn = sessionStorage.getItem('loggedIn');
	const [quiz, setQuiz] = useState(null);
	const {id} = useParams();
	const calledAPI = useRef(false);
	const [quizName, setQuizName] = useState("");
	const [inserting, setInserting] = useState(false);

	useEffect(function(){
		if(!calledAPI.current){
			supabase.from('quiz').select(`quiz_id, quiz_name, question ( question_id, question, answer (answer, is_correct) )`).eq('quiz_id', id).then(function(data){
				setQuiz(data.data[0].question);
				setQuizName(data.data[0].quiz_name);
				console.log(data);
			}).catch(function(error){
				console.log(error)
			});
			calledAPI.current = true;
		}
	}, []);


	function updateQuestion(value, field, index){
		setNewQuiz(function(prevQuiz){ 
			const updatedQuiz = [...prevQuiz];
			updatedQuiz[index] = { ...updatedQuiz[index], [field]: value };
			return updatedQuiz;
		});
	}

	function addQuestion(){
		setNewQuiz(function(prevQuiz){  
			return [
				...prevQuiz,
				{ id: Date.now() + Math.random() } 
			]
		});
	}
	function removeQuestion(id){
		const index = newQuiz.findIndex(item => item.id === id);
		setNewQuiz(function(oldQuiz){
			return [
				...oldQuiz.slice(0, index),
				...oldQuiz.slice(index + 1)
			];
		});
	}

	// function validateQuiz(){
	// 	if(quizName){
	// 		const allQFilled = newQuiz.every(function(q){
	// 			return q.Q && q.A && q.D1 && q.D2
	// 		})
	// 		if(!allQFilled){
	// 			alert("all questions must be completed");
	// 		}else{
	// 			createQuiz()
	// 		}
	// 	}else{
	// 		alert("Please name your quiz");
	// 	}
	// }

	// async function createQuiz() {
	// 	setInserting(true);
	// 	const {data, error} = await supabase.from('quiz').insert({teacher_id: sessionStorage.getItem('userId'), quiz_name: quizName}).select();
	// 	if(data){
	// 		const questionIds = [];
	// 		for(let i = 0; i < newQuiz.length; i++){
	// 			const {data: qData, error: qErr} = await supabase.from('question').insert({quiz_id: data[0].quiz_id, question: newQuiz[i].Q}).select();
	// 			const {data: aData, error: aErr} = await supabase.from('answer').insert(
	// 				[
	// 					{question_id: qData[0].question_id, answer: newQuiz[i].A, is_correct: true},
	// 					{question_id: qData[0].question_id, answer: newQuiz[i].D1, is_correct: false},
	// 					{question_id: qData[0].question_id, answer: newQuiz[i].D2, is_correct: false}
	// 				]
	// 			);
	// 		}
	// 	}else{
	// 		console.log(error);
	// 	}

	// 	setInserting(false);
	// }

	if(loggedIn){
		return(
			quiz != null ? (
				<>
					<TeacherNav disabledButtons={{'dashboard': false, 'newQuiz': false}} />
					<div className="white-overlay">
						<label className="create-new-quiz-label" htmlFor='quizName'>Quiz Title:</label>
						<input className="create-new-quiz-input" type="text" id='quizName' onInput={(e)=>{setQuizName(e.target.value)}} value={quizName} />
						{quiz.map(function(item, index){
							return(
								<div className="question" key={item.question_id}>
									<i className="fa fa-2 fa-window-close" aria-hidden="true" onClick={()=>{removeQuestion(item.question_id)}}></i>
									<label className="create-new-quiz-label" htmlFor={"Q" + index}>Question {index + 1}:</label>
									<input className="create-new-quiz-input" type="text" id={"Q" + index} onInput={(e)=>{updateQuestion(e.target.value, "Q", index)}} value={item.question} />
									{item.answer.map(function(ans, index2){
										return (
											<>
												{ans.is_correct ? (
													<label className="create-new-quiz-label" htmlFor={"A" + index2}>Answer:</label>
												) : (
													<label className="create-new-quiz-label" htmlFor={"D" + index2}>Distractor:</label>
												)}
												<input className="create-new-quiz-input" type="text" id={index + "-" + index2} onInput={(e)=>{updateQuestion(e.target.value, "D2", index)}} value={ans.answer} />
											</>
										)
									})}
									{/* <label className="create-new-quiz-label" htmlFor={"D2" + index}>Second Distractor:</label>
									<input className="create-new-quiz-input" type="text" id={"D2" + index} onInput={(e)=>{updateQuestion(e.target.value, "D2", index)}} /> */}
								</div>
							)
						})}
						<Button className="plus-button add-new-question-button" buttonText="+" onClickFunc={alert} />
						{!inserting ? (
							<Button buttonText='Create Quiz' onClickFunc={alert} />
						):(
							<Button buttonText='Inserting...' disabled={true} />
						)}
					</div>
				</>
			) : (
				<>
					<TeacherNav disabledButtons={{'dashboard': false, 'newQuiz': false}} />
					<div className="white-overlay">
						<p className="loading">Loading...</p>
					</div>
				</>
			)
		);
	}else{
		return(
			<NotLoggedIn />
		)
	}
	// }else{
	// 	return (
	// 		
	// 	)
	// }
};

export default EditQuiz;