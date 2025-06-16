import { Fragment, useEffect, useRef, useState } from "react";

import supabase from "../API/init";
import { Button, NotLoggedIn, TeacherNav, LabelledInput } from "../components";
import { useParams } from "react-router-dom";

const EditQuiz = function(){

	let loggedIn = sessionStorage.getItem('loggedIn');
	const [quiz, setQuiz] = useState(null);
	const {id} = useParams();
	const calledAPI = useRef(false);
	let savedQuizName;
	const [quizName, setQuizName] = useState("");
	const [inserting, setInserting] = useState(false);

	useEffect(function(){
		if(!calledAPI.current){
			supabase.from('quiz').select(`quiz_id, quiz_name, question ( question_id, question, answer (answer, is_correct) )`).eq('quiz_id', id).then(function(data){
				setQuiz(data.data[0].question);
				setQuizName(data.data[0].quiz_name);
				savedQuizName = data.data[0].quiz_name;
			}).catch(function(error){
				console.log(error)
			});
			calledAPI.current = true;
		}
	}, []);


	function updateQuestion(value, field, question_id){
		const index = quiz.findIndex(item => item.question_id === question_id);
		setQuiz(function(prevQuiz){ 
			const updatedQuiz = [...prevQuiz];
			updatedQuiz[index] = { ...updatedQuiz[index], [field]: value };
			return updatedQuiz;
		});
	}

	function updateAnswer(value, question_id, index){
		const qIndex = quiz.findIndex(item => item.question_id === question_id);
		setQuiz(function(prevQuiz){ 
			const updatedQuiz = [...prevQuiz];
			const updatedAnswers = [...updatedQuiz[qIndex].answer]
			updatedAnswers[index].answer = value;
			updatedQuiz[qIndex].answer = updatedAnswers;
			return updatedQuiz;
		});
	}

	function addQuestion(){
		setQuiz(function(prevQuiz){  
			return [
				...prevQuiz,
				{ 
					answer: [{answer:" ", is_correct: true},{answer:" ", is_correct: false},{answer:" ", is_correct: false}],
					question: "",
					question_id: Date.now() + Math.random() 
				} 
			]
		});
	}
	function removeQuestion(question_id){
		const index = quiz.findIndex(item => item.question_id === question_id);
		setQuiz(function(oldQuiz){
			return [
				...oldQuiz.slice(0, index),
				...oldQuiz.slice(index + 1)
			];
		});
	}

	function validateQuiz(){
		if(quizName){
			const allQFilled = quiz.every(function(q){
				return q.answer[0].answer && q.answer[1].answer && q.answer[2].answer && q.question
			})
			if(!allQFilled){
				alert("all questions must be completed");
			}else{
				createQuiz()
			}
		}else{
			alert("Please name your quiz");
		}
	}

	async function createQuiz() {
		setInserting(true);
		if(quizName != savedQuizName){
			const {error} = await supabase.from('quiz').update({quiz_name: quizName}).eq('quiz_id', id);
		}
		const updatedQuestion = [];
		const newQuestions = [];
		for(let i = 0; i < quiz.length; i++){
			if(Number.isInteger(quiz[i].question_id)){
				updatedQuestion.push(quiz[i]);
			}else{
				newQuestions.push(quiz[i]);
			}
		}
		
		setInserting(false);
	}

	if(loggedIn){
		return(
			(quiz != null) ? (
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
									<input className="create-new-quiz-input" type="text" id={"Q" + index} onInput={(e)=>{updateQuestion(e.target.value, "question", item.question_id)}} value={item.question} />
									{item.answer.map(function(ans, index2){
										return (
											<Fragment key={index2}>
												{ans.is_correct ? (
													<label className="create-new-quiz-label" key={"D" + index2 + 'key'} htmlFor={index + "-" + index2}>Answer:</label>
												) : (
													<label className="create-new-quiz-label" key={"D" + index2 + 'key'}
													htmlFor={index + "-" + index2}>Distractor:</label>
												)}
												
													<input className="create-new-quiz-input" type="text" id={index + "-" + index2}  key={index + "-" + index2} onInput={(e)=>{updateAnswer(e.target.value, item.question_id, index2)}} value={ans.answer || quiz[index].answer[index2] } />
											</Fragment>
										)
									})}
								</div>
							)
						})}
						<Button className="plus-button add-new-question-button" buttonText="+" onClickFunc={addQuestion} />
						{!inserting ? (
							<Button buttonText='Save Quiz' onClickFunc={validateQuiz} />
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
};

export default EditQuiz;