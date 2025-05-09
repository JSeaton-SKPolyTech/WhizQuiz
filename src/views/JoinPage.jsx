import { useState } from "react";
import { LabelledInput, Button } from "../components";
import { useNavigate } from "react-router-dom";

const JoinPage = function(){
	const [roomId, setRoomId] = useState('');
	const navigate = useNavigate();

	function joinRoom(){
		if(roomId !== ""){
			navigate(`/room/${roomId}`);
		}else{
			alert('Please enter in a room id');
		}
		
	}

	return(
		<>
			<LabelledInput 
				label='Please Enter the Room Id'
				id='roomId'
				setState={setRoomId}
				state={roomId}
			/>
			<Button 
				buttonText='Join'
				onClickFunc={joinRoom}
			/>
		</>
	);
};

export default JoinPage;