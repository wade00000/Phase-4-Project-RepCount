import { useState } from "react"
import axios from "../api/axios"
import { useAuth } from "./AuthContext"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/login", { email, password })
      login(res.data.token)
      setMessage("Logged in successfully!")

      setTimeout(() => {
        navigate("/profile")
      }, 1000)
    } catch (err) {
      setMessage("Login failed. Please check your credentials.")
    }
  }

  return (
    <div className="container mt-0 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4 text-center text-primary">Login to RepCount</h2>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {message && (
          <p className="mt-3 text-center text-danger">{message}</p>
        )}
      </div>
    </div>
  )
}

export default Login
