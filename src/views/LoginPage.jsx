import { useState } from "react";

import supabase from '../API/init';
import loginImage from '../assets/login-image.png';
import { LabelledInput, Button } from "../components";
import { useNavigate } from "react-router-dom";

function LoginPage() {	
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);
	const navigate = useNavigate();

	async function signUp(){
		const {data, error} = await supabase.auth.signUp({
			email: userEmail,
			password: userPassword
		});
		if(!error){
			const response = await supabase.from('user').insert({user_id: data.user.id, role: 'teacher'});
			if(!response.error){
				sessionStorage.setItem('loggedIn', true);
				sessionStorage.setItem('userId', data.user.id);
				navigate('/dashboard');
			}else{
				console.log(e);
			}
		}else{
			alert(error);
		}
	}

	async function login(){
		const {data, error} = await supabase.auth.signInWithPassword({
			email: userEmail,
			password: userPassword
		});
		if(!error){
			sessionStorage.setItem('loggedIn', true);
			sessionStorage.setItem('userId', data.user.id);
			navigate('/dashboard');
		}else{
			console.log(e);
		}
	}

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
						{isLogin ? 
							<>
								<Button buttonText="Login" onClickFunc={login} /> 
								<p className="sign-up-text">Don't have an account? <span onClick={()=>{setIsLogin(false)}}>Sign up here!</span></p>
							</>
						: 
							<Button buttonText="Sign Up" onClickFunc={signUp} />
						}
						
					</div>
				</div>
			</div>
		</div>
    );
}

export default LoginPage;
