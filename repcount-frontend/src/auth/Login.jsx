import { useState } from "react"
import axios from "../api/axios"
import { useAuth } from "./AuthContext" 
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/login", { email, password })
      login(res.data.token)
      navigate("/profile")
    } catch (err) {
      alert("Login failed")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login

//This collects email + password, 
// sends them to the backend, 
// and saves the returned JWT.