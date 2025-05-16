import Button from './Button';

const TeacherNav = function(){
	return (
		<nav>
			<Button className='Nav-Button' buttonText="Dashboard" />
			<Button className='Nav-Button' buttonText="New Quiz" disabled={true} />
			<Button className='Nav-Button' buttonText="Start Quiz" />
		</nav>
	)
};

export default TeacherNav;