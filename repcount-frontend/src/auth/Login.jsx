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

      // Give the user a second to read the message, then navigate
      setTimeout(() => {
        navigate("/profile")
      }, 1000)
    } catch (err) {
      setMessage("Login failed. Please check your credentials.")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Login
