import { Navigate, useNavigate } from 'react-router-dom';

import Button from './Button';

const TeacherNav = function(){
	const navigate = useNavigate();
	
	function goToDashboard(){
		navigate('/dashboard');
	}
	function goToNewQuiz(){
		navigate('/createQuiz');
	}
	function startQuiz(){

	}


	return (
		<nav>
			<Button className='Nav-Button' buttonText="Dashboard" onClickFunc={goToDashboard} />
			<Button className='Nav-Button' buttonText="New Quiz" disabled={true} onClickFunc={goToNewQuiz} />
			<Button className='Nav-Button' buttonText="Start Quiz" onClickFunc={startQuiz} />
		</nav>
	)
};

export default TeacherNav;