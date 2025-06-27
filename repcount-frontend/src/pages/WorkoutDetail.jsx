import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "../api/axios"

function WorkoutDetail() {
  const { id } = useParams()
  const [workout, setWorkout] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await axios.get(`/workouts/${id}`)
        setWorkout(res.data)
      } catch (err) {
        console.error("Error fetching workout:", err)
        setError("Failed to load workout")
      } finally {
        setLoading(false)
      }
    }

    fetchWorkout()
  }, [id])

  if (loading) return <div className="alert alert-info">Loading workout...</div>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!workout) return <div className="alert alert-warning">No workout found</div>

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-3">← Back</Link>

      <h2 className="mb-4">
        Workout on {new Date(workout.date).toLocaleDateString()}
      </h2>

      {workout.workout_exercises.map((we, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              {we.exercise?.name || "Unnamed Exercise"}
            </h5>
            {we.notes && (
              <p className="card-text text-muted"><em>Notes:</em> {we.notes}</p>
            )}
            <ul className="list-group list-group-flush">
              {we.sets.map((set, idx) => (
                <li key={idx} className="list-group-item">
                  Set {idx + 1}: {set.reps} reps @ {set.weight}kg
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WorkoutDetail
