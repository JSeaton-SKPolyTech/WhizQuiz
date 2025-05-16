import { TeacherNav } from "../components";

const Dashboard = function(){
	
	return(
		<>
			<TeacherNav disabledButtons={{'dashboard': true, 'newQuiz': false}} />
		</>
	)
}

export default Dashboard;