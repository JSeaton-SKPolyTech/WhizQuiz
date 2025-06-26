import { TeacherNav, QuizList, NotLoggedIn } from "../components";

const Dashboard = function(){
	let loggedIn = sessionStorage.getItem('loggedIn');

	function startQuizSelected(){
		alert('selected');
	}

	if(loggedIn){
		return(
			<>
				<TeacherNav disabledButtons={{'dashboard': true, 'newQuiz': false, 'startQuiz': false}} startQuiz={startQuizSelected} />
				<QuizList width='30%' className="dashboard-quiz-list" />
			</>
		)
	}else{
		return(
			<NotLoggedIn />
		)
	}
}

export default Dashboard;