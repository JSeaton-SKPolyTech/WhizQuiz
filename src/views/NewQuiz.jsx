import { useState } from "react";

import { Button, TeacherNav } from "../components";
import Dashboard from "./Dashboard";

const NewQuiz = function(){

	const [newQuiz, setNewQuiz] = useState([{}]);

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

	function createQuiz(){
		console.log('called function');
		
	};

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
				<Button buttonText='Create Quiz' onClickFunc={createQuiz}
				/>
			</div>
		</>
	);
};

export default NewQuiz;