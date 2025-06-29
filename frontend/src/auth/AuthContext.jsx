import { createContext, useContext, useEffect, useState } from "react"
import axios from "../api/axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem("token"))

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.get("/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setUser(res.data)
        } catch {
          setToken(null)
          setUser(null)
          localStorage.removeItem("token")
        }
      }
    }

    fetchUser()
  }, [token])

  const login = (token) => {
    setToken(token)
    localStorage.setItem("token", token)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

// This is the global "auth manager" that stores 
// a logged-in user and token, 
// and provides login/logout methods.