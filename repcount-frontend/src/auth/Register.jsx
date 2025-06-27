import { useState } from "react"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"

function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/register", { username, email, password })
      alert("Registered successfully!")
      navigate("/login")
    } catch {
      alert("Registration failed")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  )
}

export default Register


//Creates a new user by 
// sending username, email, 
// and password to /register.