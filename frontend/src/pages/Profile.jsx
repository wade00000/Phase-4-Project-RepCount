import React from 'react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) return <p>Loading...</p>

  const handleStartLogging = () => {
    navigate('/') // Redirect to main logging/dashboard route
  }

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <p>User ID: {user.id}</p>

      <button onClick={handleStartLogging} style={{ marginTop: '1rem' }}>
        Start Logging
      </button>
    </div>
  )
}

export default Profile
