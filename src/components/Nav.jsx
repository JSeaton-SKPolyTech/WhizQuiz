import { Link } from 'react-router-dom';

const Nav = function(){
	return(
		<nav>
			<Link to='/createQuiz' >New Quiz</Link>
		</nav>
	)
}

export default Nav;