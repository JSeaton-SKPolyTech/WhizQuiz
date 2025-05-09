import { useState } from "react";

import { LabelledInput, Button } from "../components";

const NewQuiz = function(){
	const [q, setQ] = useState('');
	const [a1, setA1] = useState('');
	const [a2, setA2] = useState('');
	const [a3, setA3] = useState('');

	function createQuiz(){
		console.log('called function');
		
	};

	return(
		<>
			<LabelledInput 
				label='Enter the Question'
				id='q'
				setState={setQ}
				state={q}
			/>
			<LabelledInput 
				label='Enter the first option'
				id='a1'
				setState={setA1}
				state={a1}
			/>
			<LabelledInput 
				label='Enter the second option'
				id='a2'
				setState={setA2}
				state={a2}
			/>
			<LabelledInput 
				label='Enter the third option'
				id='a3'
				setState={setA3}
				state={a3}
			/>
			<Button 
				buttonText='Create Quiz'
				onClickFunc={createQuiz}
			/>
		</>
	);
};

export default NewQuiz;