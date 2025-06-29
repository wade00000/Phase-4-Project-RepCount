import React, { useEffect, useState } from "react"
import axios from "../api/axios"
import WorkoutVolumeChart from "../components/WorkoutVolumeChart"
import RepsVsWeightChart from "../components/RepsVsWeightChart"

function Charts() {
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
        setError("Something went wrong while loading chart data")
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  if (loading) return <div className="alert alert-info">Loading charts...</div>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!workouts.length) return <div className="alert alert-warning">No workout data to display</div>

  return (
    <div className="container mt-0">
      <h2 className="mb-4">Workout Charts</h2>

      <div className="card mb-4 p-3">
        <h5 className="mb-3">Workout Volume Over Time</h5>
        <WorkoutVolumeChart workouts={workouts} />
      </div>

      <div className="card mb-4 p-3">
        <h5 className="mb-3">Reps vs Weight</h5>
        <RepsVsWeightChart workouts={workouts} />
      </div>
    </div>
  )
}

export default Charts
