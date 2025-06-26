import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkoutLogger from './pages/WorkoutLogger';
import WorkoutHistory from './pages/WorkoutHistory';
import WorkoutDetail from "./pages/WorkoutDetail";
import LoggedWorkouts from './pages/LoggedWorkouts'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-workout" element={<WorkoutLogger />} />
        <Route path="/workouts" element={<WorkoutHistory />} />
        <Route path="/workouts/:id" element={<WorkoutDetail />} />
        <Route path="/logged-workouts" element={<LoggedWorkouts />} />
        {/* Add more routes as you build more pages */}
      </Routes>
    </Router>
  );
}

export default App;
