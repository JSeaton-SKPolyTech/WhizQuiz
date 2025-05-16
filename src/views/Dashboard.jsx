import { TeacherNav, QuizList } from "../components";

const Dashboard = function(){
	
	return(
		<>
			<TeacherNav disabledButtons={{'dashboard': true, 'newQuiz': false}} />
			<QuizList width='30%' className="dashboard-quiz-list" />
		</>
	)
}

export default Dashboard;