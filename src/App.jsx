import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {LoginPage, RoomPage, JoinPage, NewQuiz} from './views';
import { Nav } from './components';

function App() {

	return (
		<div className='background-graphic'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/room/:id" element={<RoomPage />} />
					<Route path="/join" element={<JoinPage />} />
					<Route path="/createQuiz" element={<NewQuiz />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
