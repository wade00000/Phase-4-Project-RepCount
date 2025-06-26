import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkoutLogger from './pages/WorkoutLogger';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-workout" element={<WorkoutLogger />} />
        {/* Add more routes as you build more pages */}
      </Routes>
    </Router>
  );
}

export default App;
