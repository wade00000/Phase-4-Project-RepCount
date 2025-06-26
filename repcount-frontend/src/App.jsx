import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkoutLogger from './pages/WorkoutLogger';
import WorkoutHistory from './pages/WorkoutHistory';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-workout" element={<WorkoutLogger />} />
        <Route path="/workouts" element={<WorkoutHistory />} />
        {/* Add more routes as you build more pages */}
      </Routes>
    </Router>
  );
}

export default App;
