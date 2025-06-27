import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkoutLogger from './pages/WorkoutLogger';
import Navbar from './components/Navbar'
import WorkoutDetail from "./pages/WorkoutDetail";
import LoggedWorkouts from './pages/LoggedWorkouts'; 

function App() {
  return (
    <Router>
      <Navbar/>
      <div className='container mt-3'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-workout" element={<WorkoutLogger />} />
          <Route path="/workouts/:id" element={<WorkoutDetail />} />
          <Route path="/logged-workouts" element={<LoggedWorkouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
