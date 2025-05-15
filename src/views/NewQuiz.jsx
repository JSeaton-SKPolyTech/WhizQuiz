import { useState } from "react";

import { LabelledInput, Button } from "../components";

const NewQuiz = function(){

	const [newQuiz, setNewQuiz] = useState([{}]);

	function updateQuestion(e){}

	function addQuestion(){
		setNewQuiz([...newQuiz, {}])
	}

	function createQuiz(){
		console.log('called function');
		
	};

	return(
		<div className="white-overlay">
			{newQuiz.map(function(label, index){
				return(
					<div key={index}>
						<label htmlFor={"Q" + index}>Question:</label>
						<input type="text" id={"Q" + index} />
						<label htmlFor={"A" + index}>Answer:</label>
						<input type="text" id={"A" + index} />
						<label htmlFor={"D1" + index}>First Distractor:</label>
						<input type="text" id={"D1" + index} />
						<label htmlFor={"D2" + index}>Second Distractor:</label>
						<input type="text" id={"D2" + index} />
					</div>
				)
			})}
			<Button className="plus-button" buttonText="+" onClickFunc={addQuestion} />
			<Button buttonText='Create Quiz' onClickFunc={createQuiz}
			/>
		</div>
	);
};

export default NewQuiz;