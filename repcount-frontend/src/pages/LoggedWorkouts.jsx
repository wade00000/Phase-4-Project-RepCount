import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "../api/axios"


function LoggedWorkouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get("/workouts")
        setWorkouts(res.data)
      } catch (err) {
        console.error("Failed to fetch workouts", err)
        setError("Something went wrong while loading workouts")
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  if (loading) return <div className="alert alert-info">Loading workouts...</div>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!workouts.length) return <div className="alert alert-warning">No workouts found</div>

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Logged Workouts</h2>

      
      {workouts.map((workout) => (
        <div key={workout.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              {new Date(workout.date).toLocaleDateString()}
            </h5>
            <p className="card-text">
              {workout.workout_exercises?.length || 0} exercises
            </p>
            <Link to={`/workouts/${workout.id}`} className="btn btn-outline-primary">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoggedWorkouts
