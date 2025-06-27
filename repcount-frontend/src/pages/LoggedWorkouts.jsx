import React, { useEffect, useState } from "react"
import axios from "../api/axios"
import { getWorkouts } from "../api/workouts"
import { getExercises } from "../api/exercises"
import { Link } from "react-router-dom"
import WorkoutVolumeChart from "../components/WorkoutVolumeChart"
import RepsVsWeightChart from "../components/RepsVsWeightChart"

function LoggedWorkouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortAsc, setSortAsc] = useState(false)
  const [filterDate, setFilterDate] = useState("")
  const [volumeData, setVolumeData] = useState([])
  const [availableExercises, setAvailableExercises] = useState([])

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await getWorkouts()
        const workouts = res.data

        setWorkouts(workouts)

        const volumes = workouts.map(workout => {
          let totalVolume = 0

          workout.workout_exercises.forEach(we => {
            we.sets.forEach(set => {
              totalVolume += set.reps * set.weight
            })
          })

          return {
            date: new Date(workout.date).toLocaleDateString(),
            totalVolume
          }
        })

        setVolumeData(volumes)
      } catch (err) {
        console.error("Error fetching workouts", err)
        setError("Failed to load workouts.")
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await getExercises()
        setAvailableExercises(res.data)
      } catch (err) {
        console.error("Error fetching exercises", err)
      }
    }

    fetchExercises()
  }, [])

  const handleDelete = async id => {
    if (!confirm("Are you sure you want to delete this workout?")) return

    try {
      await axios.delete(`/workouts/${id}`)
      setWorkouts(prev => prev.filter(w => w.id !== id))
    } catch (err) {
      console.error("Failed to delete workout", err)
      alert("Delete failed.")
    }
  }

  const sortedFiltered = workouts
    .filter(w => (filterDate ? w.date.startsWith(filterDate) : true))
    .sort((a, b) => {
      const aTime = new Date(a.date).getTime()
      const bTime = new Date(b.date).getTime()
      return sortAsc ? aTime - bTime : bTime - aTime
    })

  if (loading) return <p>Loading workouts...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Logged Workouts</h2>

      <RepsVsWeightChart
        workouts={workouts}
        availableExercises={availableExercises}
      />

      {volumeData.length > 0 && <WorkoutVolumeChart data={volumeData} />}

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Filter by Date:{" "}
          <input
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />
        </label>
        <button
          onClick={() => setSortAsc(prev => !prev)}
          style={{ marginLeft: "1rem" }}
        >
          Sort: {sortAsc ? "Oldest → Newest" : "Newest → Oldest"}
        </button>
      </div>

      {sortedFiltered.length === 0 ? (
        <p>No workouts match the criteria.</p>
      ) : (
        sortedFiltered.map(workout => (
          <div
            key={workout.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "8px"
            }}
          >
            <h3>
              {new Date(workout.date).toLocaleDateString()}{" "}
              <button
                onClick={() => handleDelete(workout.id)}
                style={{ marginLeft: "1rem", color: "red" }}
              >
                Delete
              </button>
            </h3>

            <Link to={`/workouts/${workout.id}`}>View Details</Link>

            {workout.workout_exercises.map(we => (
              <div key={we.id} style={{ marginBottom: "0.75rem" }}>
                <strong>{we.exercise?.name || "Unnamed Exercise"}</strong>
                {we.notes && <p>Notes: {we.notes}</p>}
                <ul style={{ margin: 0 }}>
                  {we.sets.map((set, idx) => (
                    <li key={idx}>
                      {set.reps} reps @ {set.weight}kg
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  )
}

export default LoggedWorkouts
