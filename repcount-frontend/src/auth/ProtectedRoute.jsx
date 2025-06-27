import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

export default ProtectedRoute

// This restricts certain routes 
// (like /profile, /log-workout) to logged-in users only.
