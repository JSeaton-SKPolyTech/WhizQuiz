import QRCode from 'react-qr-code';

import Button from "../components/Button";

const roomUrl = `${window.location.origin}/join/`;

const StartQuizScreen = function () {

	function clickStart(){

	}

	return (
		<>
			<QRCode value={roomUrl} />
			<Button buttonText='Start Game' onClickFunc={clickStart} />
		</>
	)
}

export default StartQuizScreen;