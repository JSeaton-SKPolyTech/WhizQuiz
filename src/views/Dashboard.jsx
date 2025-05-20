import { TeacherNav, QuizList, NotLoggedIn } from "../components";

const Dashboard = function(){
	let loggedIn = sessionStorage.getItem('loggedIn');

	if(loggedIn){
		return(
			<>
				<TeacherNav disabledButtons={{'dashboard': true, 'newQuiz': false}} />
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