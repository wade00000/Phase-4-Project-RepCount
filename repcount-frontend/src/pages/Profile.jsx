import React from 'react'
import { useAuth } from '../auth/AuthContext'

function Profile() {
  const { user } = useAuth()

  if (!user) return <p>Loading...</p>

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <p>User ID: {user.id}</p>
    </div>
  )
}

export default Profile
