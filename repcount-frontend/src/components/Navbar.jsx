import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav
      className="navbar navbar-expand-lg mb-4"
      style={{
        background: 'linear-gradient(to right, #ff4ecb, #00ffe1)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center text-white fw-bold" to="/">
          <img
            src="/favicon-32x32.png"
            alt="Logo"
            className="me-1"
            style={{ width: '30px', height: '30px', objectFit: 'cover' }}
          />
          <span style={{ fontSize: '1.2rem' }}>RepCount</span>
        </Link>

        <button
          className="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/log-workout">Log Workout</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/logged-workouts">Workouts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/charts">Charts</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <img
                    src="/blank.webp"
                    alt="Profile"
                    className="rounded-circle me-2"
                    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                  />
                  <Link className="nav-link text-white" to="/profile">
                    {user.username}
                  </Link>
                </li>
                <li className="nav-item d-flex align-items-center">
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline-light btn-sm"
                        style={{ borderRadius: '20px' }}
                    >
                        Logout
                    </button>
                </li>

              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
