import { Navigate, useNavigate } from 'react-router-dom';

import Button from './Button';

const TeacherNav = function({disabledButtons=false, startQuiz}){
	const navigate = useNavigate();
	
	function goToDashboard(){
		navigate('/dashboard');
	}
	function goToNewQuiz(){
		navigate('/createQuiz');
	}

	return (
		<nav>
			<Button className='Nav-Button' buttonText="Dashboard" disabled={disabledButtons.dashboard} onClickFunc={goToDashboard} />
			<Button className='Nav-Button' buttonText="New Quiz" disabled={disabledButtons.newQuiz} onClickFunc={goToNewQuiz} />
			<Button className='Nav-Button' buttonText="Start Quiz" disabled={disabledButtons.startQuiz} onClickFunc={startQuiz} />
		</nav>
	)
};

export default TeacherNav;