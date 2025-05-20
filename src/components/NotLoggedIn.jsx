import { Link } from "react-router-dom";

const NotLoggedIn = function(){
	return(
		<>
			<h1 className="add-margin">Please Login</h1>
			<div className="add-margin">
				<div className="white-overlay">
					<div className="centre-vertically">
						<p className="centre-text">You are not logged in.</p>
						<Link className="centre-text" to='/' >Sign in here.</Link>
					</div>
				</div>
			</div>
		</>
	)
};

export default NotLoggedIn;