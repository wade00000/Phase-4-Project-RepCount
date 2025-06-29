import React from "react"
import { Link } from "react-router-dom"

function Welcome() {
  return (
    <div className="container mt-0">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-3 text-center">
          Welcome to <span className="text-primary">RepCount</span> 🏋️‍♂️
        </h2>

        <p className="lead text-center text-secondary">
          Log workouts, track progress, and stay consistent. One rep at a time.
        </p>

        <div className="d-flex justify-content-center mt-4">
          <Link to="/log-workout" className="btn btn-success btn-lg">
            🚀 Start Logging
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome
