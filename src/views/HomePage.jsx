import { useState } from "react";
import { LabelledInput, Button } from "../components";

function HomePage() {	
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

    return (
		<div className="white-overlay add-flex">
			<div className="flex-grow">image placeholder</div>
			<div className="flex-grow">
				<h1>Whiz Quiz</h1>
				<p className="subtitle">Train Your Brain. Master the Game.</p>
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
				<Button buttonText="Login" />
			</div>
        </div>
    );
}

export default HomePage;
