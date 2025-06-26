import { Fragment, useEffect, useRef, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

import supabase from "../API/init";
import { Button, NotLoggedIn, TeacherNav, LabelledInput } from "../components";

const EditQuiz = function(){

	let loggedIn = sessionStorage.getItem('loggedIn');
	const {id} = useParams();
	const savedQuiz = useRef();
	const calledAPI = useRef(false);
	const navigate = useNavigate();

	const [quiz, setQuiz] = useState(null);
	const [quizName, setQuizName] = useState("");
	const [deletedQuestions, setDeletedQuestion] = useState([]);
	const [inserting, setInserting] = useState(false);

	let savedQuizName;
	let isQuestionUpdated = false;

	useEffect(function(){
		if(!calledAPI.current){
			supabase.from('quiz').select(`quiz_id, quiz_name, question ( question_id, question, answer (answer_id, answer, is_correct) )`).eq('quiz_id', id).then(function(data){
				setQuiz(data.data[0].question);
				savedQuiz.current = structuredClone(data.data[0].question);
				setQuizName(data.data[0].quiz_name);
				savedQuizName = data.data[0].quiz_name;
			}).catch(function(error){
				console.log(error)
			});
			calledAPI.current = true;
		}
	}, []);


	function updateQuestion(value, field, question_id){
		isQuestionUpdated = true;
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
		setDeletedQuestion(function(oldArr){
			return [...oldArr, question_id]
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
				createQuiz();
			}
		}else{
			alert("Please name your quiz");
		}
	}

	function areQuestionsEqual(q1, q2) {
		return (
			q1.question === q2.question &&
			q1.answer[0].answer === q2.answer[0].answer &&
			q1.answer[1].answer === q2.answer[1].answer &&
			q1.answer[2].answer === q2.answer[2].answer
		);
	}

	async function createQuiz() {
		setInserting(true);
		if(quizName != savedQuizName){
			const {error} = await supabase.from('quiz').update({quiz_name: quizName}).eq('quiz_id', id);
		}
		const updatedQuestions = [];
		const newQuestions = [];
		for(let i = 0; i < quiz.length; i++){
			if(Number.isInteger(quiz[i].question_id)){
				if(!areQuestionsEqual(quiz[i], savedQuiz.current[i])){
					updatedQuestions.push(quiz[i]);
				}	
			}else{
				newQuestions.push(quiz[i]);
			}
		}
		
		for(let i = 0; i < updatedQuestions.length; i++){
			const {error: error1} = await supabase.from('question').update({question: updatedQuestions[i].question}).eq('question_id', updatedQuestions[i].question_id);
			const {error: error2} = await supabase.from('answer').update({answer: updatedQuestions[i].answer[0].answer}).eq('answer_id', updatedQuestions[i].answer[0].answer_id);
			const {error: error3} = await supabase.from('answer').update({answer: updatedQuestions[i].answer[1].answer}).eq('answer_id', updatedQuestions[i].answer[1].answer_id);
			const {error: error4} = await supabase.from('answer').update({answer: updatedQuestions[i].answer[2].answer}).eq('answer_id', updatedQuestions[i].answer[2].answer_id);
		}
		for(let i = 0; i < newQuestions.length; i++){
			const {data: data1, error: error1} = await supabase.from('question').insert({quiz_id: id, question: newQuestions[i].question}).select();
			// update question id
			const {data: data2, error: error2} = await supabase.from('answer').insert({question_id: data1[0].question_id, answer: newQuestions[i].answer[0].answer, is_correct: true}).select();
			const {data: data3, error: error3} = await supabase.from('answer').insert({question_id: data1[0].question_id, answer: newQuestions[i].answer[1].answer, is_correct: false}).select();
			const {data: data4, error: error4} = await supabase.from('answer').insert({question_id: data1[0].question_id, answer: newQuestions[i].answer[2].answer, is_correct: false}).select();
			// update answer_id
		}
		for(let i = 0; i < deletedQuestions.length; i++){
			const response1 = await supabase.from('answer').delete().eq('question_id', deletedQuestions[i]);
			const response2 = await supabase.from('question').delete().eq('question_id', deletedQuestions[i]);
		}
		
		setInserting(false);
	}

	function startQuizSelected(){
		navigate(`/start/${id}`);
	}

	if(loggedIn){
		return(
			(quiz != null) ? (
				<>
					<TeacherNav disabledButtons={{'dashboard': false, 'newQuiz': true, 'startQuiz': false}} startQuiz={startQuizSelected} />
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