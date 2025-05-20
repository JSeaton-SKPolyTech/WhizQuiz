import { useState } from "react";

import { Button, NotLoggedIn, TeacherNav } from "../components";
import Dashboard from "./Dashboard";

const NewQuiz = function(){

	const [newQuiz, setNewQuiz] = useState([{}]);
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

	function wait(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	// Example usage in your async function
	async function createQuiz() {
		setInserting(true);
		let timerDone = false;
		await wait(3000); // wait for 3 seconds
		timerDone = true;
		console.log("Timer finished:", timerDone);
		setInserting(false);
	}

	if(loggedIn){
		return(
			<>
				<TeacherNav disabledButtons={{'dashboard': false, 'newQuiz': true}} />
				<div className="white-overlay">
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