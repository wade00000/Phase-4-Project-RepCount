import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import WorkoutLogger from './pages/WorkoutLogger';
import Navbar from './components/Navbar'
import WorkoutDetail from "./pages/WorkoutDetail";
import LoggedWorkouts from './pages/LoggedWorkouts'; 
import Profile from './pages/Profile';


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
          <Route path="/profile" element={
                                            <ProtectedRoute>
                                              <Profile />
                                            </ProtectedRoute>
                                          } />
           {/*Auth routes*/}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
