import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {LoginPage, RoomPage, JoinPage, NewQuiz, Dashboard, EditQuiz, StartQuizScreen} from './views';

function App() {

	return (
		<div className='background-graphic'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/room/:id" element={<RoomPage />} />
					<Route path="/join" element={<JoinPage />} />
					<Route path="/createQuiz" element={<NewQuiz />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/quiz/:id' element={<EditQuiz />} />
					<Route path='/start/:id' element={<StartQuizScreen/>} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
