import { useState } from "react";

import supabase from "../API/init";
import { Button, NotLoggedIn, TeacherNav, LabelledInput } from "../components";

const NewQuiz = function(){

	const [newQuiz, setNewQuiz] = useState([{}]);
	const [quizName, setQuizName] = useState("");
	const [inserting, setInserting] = useState(false);
	let loggedIn = sessionStorage.getItem('loggedIn');

	function updateQuestion(value, field, index){
		setNewQuiz(prevQuiz => {
			const updatedQuiz = [...prevQuiz];
			updatedQuiz[index] = { ...updatedQuiz[index], [field]: value };
			return updatedQuiz;
		});
	}

	function addQuestion(){
		setNewQuiz([...newQuiz, {}])
	}

	// Example usage in your async function
	async function createQuiz() {
		setInserting(true);
		const {data, error} = await supabase.from('quiz').insert({teacher_id: sessionStorage.getItem('userId'), quiz_name: quizName}).select();
		if(data){
			console.log(data[0].quiz_id);
			const questionIds = [];
			for(let i = 0; i < newQuiz.length; i++){
				const {data: qData, error: qErr} = await supabase.from('question').insert({quiz_id: data[0].quiz_id, question: newQuiz[i].Q});
			}
		}else{
			console.log(error);
		}

		setInserting(false);
	}

	if(loggedIn){
		return(
			<>
				<TeacherNav disabledButtons={{'dashboard': false, 'newQuiz': true}} />
				<div className="white-overlay">
					<label className="create-new-quiz-label" htmlFor='quizName'>Quiz Title:</label>
					<input className="create-new-quiz-input" type="text" id='quizName' onInput={(e)=>{setQuizName(e.target.value)}} value={quizName} />
					{newQuiz.map(function(label, index){
						return(
							<div className="question" key={index}>
								<label className="create-new-quiz-label" htmlFor={"Q" + index}>Question {index + 1}:</label>
								<input className="create-new-quiz-input" type="text" id={"Q" + index} onInput={(e)=>{updateQuestion(e.target.value, "Q", index)}} />
								<label className="create-new-quiz-label" htmlFor={"A" + index}>Answer:</label>
								<input className="create-new-quiz-input" type="text" id={"A" + index} onInput={(e)=>{updateQuestion(e.target.value, "A", index)}} />
								<label className="create-new-quiz-label" htmlFor={"D1" + index}>First Distractor:</label>
								<input className="create-new-quiz-input" type="text" id={"D1" + index} onInput={(e)=>{updateQuestion(e.target.value, "D1", index)}} />
								<label className="create-new-quiz-label" htmlFor={"D2" + index}>Second Distractor:</label>
								<input className="create-new-quiz-input" type="text" id={"D2" + index} onInput={(e)=>{updateQuestion(e.target.value, "D2", index)}} />
							</div>
						)
					})}
					<Button className="plus-button add-new-question-button" buttonText="+" onClickFunc={addQuestion} />
					{!inserting ? (
						<Button buttonText='Create Quiz' onClickFunc={createQuiz} />
					):(
						<Button buttonText='Inserting...' disabled={true} />
					)}
				</div>
			</>
		);
	}else{
		return(
			<NotLoggedIn />
		)
	}
};

export default NewQuiz;