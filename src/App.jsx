import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {HomePage, RoomPage, JoinPage, NewQuiz} from './views';
import { Nav } from './components';
import exportTest from './API/init';

function App() {
	console.log(exportTest);

	return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/room/:id" element={<RoomPage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/createQuiz" element={<NewQuiz />} />
            </Routes>
        </BrowserRouter>
	)
}

export default App
