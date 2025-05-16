import { useState } from "react";

import loginImage from '../assets/login-image.png';
import { LabelledInput, Button } from "../components";

function LoginPage() {	
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

    return (
		<div className="login-overlay"> 
			<div className="white-overlay add-flex ">
				<div className="flex-grow login-image-div"><img className="login-image centre-vertically" src={loginImage} alt="decorative graphic of a quiz" /></div>
				<div className="flex-grow login-form">
					<h1>Whiz Quiz</h1>
					<h2>Train Your Brain. Master the Game.</h2>
					<div className="centre-vertically ">
						<div className="login-inputs">
							<LabelledInput 
								label="Email"
								id="email"
								setState={setUserEmail}
								state={userEmail}
							/>
							<LabelledInput
								label="Password"
								id="password"
								type="password"
								setState={setUserPassword}
								state={userPassword}
							/>
						</div>
						<Button buttonText="Login" />
					</div>
				</div>
			</div>
		</div>
    );
}

export default LoginPage;
