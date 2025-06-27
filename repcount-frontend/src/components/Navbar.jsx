import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">RepCount</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Exercises</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/log-workout">Log Workout</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logged-workouts">Logged Workouts</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
