import { useNavigate } from "react-router-dom";
import { Button } from "../components";

const Dashboard = function(){
	const navigate = useNavigate();

	function gotToCreateQuiz(){
		navigate('/createQuiz');
	}
	
	return(
		<>
			<Button onClickFunc={gotToCreateQuiz} buttonText="Create Quiz" />
		</>
	)
}

export default Dashboard;