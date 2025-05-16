import { useState } from "react";

const QuizList = function({className=''}){
	const [quizList, setQuizList] = useState(['title 1', 'quiz 2', 'third one!', 'much longer title that will hoepfully go all the way to the end of the box', 'next', 'quiz 2', 'third one!', 'much longer title that will hoepfully go all the way to the end of the box', 'next', 'quiz 2', 'third one!', 'much longer title that will hoepfully go all the way to the end of the box', 'next', 'quiz 2', 'third one!', 'much longer title that will hoepfully go all the way to the end of the box', 'next', 'quiz 2', 'third one!', 'much longer title that will hoepfully go all the way to the end of the box', 'next', 'quiz 2', 'third one!', 'much longer title that will hoepfully go all the way to the end of the box', 'next', 'quiz 2', 'third one!', 'much longer title that will hoepfully go all the way to the end of the box', 'next']);
	
	return (
		<div className={`white-background ${className}`}>
			<h2>Your Quizes</h2>
			<ul className="quiz-list">
				{quizList.map(function(title, index){
					return (
						<li className="quiz-list-item" key={index}>{title}</li>
					)
				})}
			</ul>
		</div>
	)
}

export default QuizList;