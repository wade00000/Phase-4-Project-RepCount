import { useState } from "react"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"

function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/register", { username, email, password })
      setMessage("Registered successfully! Redirecting to login...")
      setTimeout(() => navigate("/login"), 1500)
    } catch (err) {
      setMessage("Registration failed. Please try again.")
    }
  }

  return (
    <div className="container mt-0 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4 text-center text-success">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>

        {message && (
          <p className="mt-3 text-center text-info">{message}</p>
        )}
      </div>
    </div>
  )
}

export default Register
