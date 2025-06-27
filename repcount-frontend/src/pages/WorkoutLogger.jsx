import React, { useState, useEffect } from "react"
import { getExercises } from "../api/exercises"
import { createWorkout } from "../api/workouts"

function WorkoutLogger() {
  const [date, setDate] = useState("")
  const [availableExercises, setAvailableExercises] = useState([])
  const [workoutExercises, setWorkoutExercises] = useState([
    {
      exerciseId: "",
      customExerciseName: "",
      notes: "",
      sets: [{ reps: "", weight: "" }]
    }
  ])

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0])

    const fetch = async () => {
      try {
        const res = await getExercises()
        setAvailableExercises(res.data)
      } catch (err) {
        console.error("Failed to fetch exercises")
      }
    }
    fetch()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!date) {
      alert("Please pick a date")
      return
    }

    const workoutPayload = {
      user_id: 1,
      date,
      workout_exercises: workoutExercises.map((we) => ({
        exercise_id: we.exerciseId === "custom" ? null : Number(we.exerciseId),
        name: we.exerciseId === "custom" ? we.customExerciseName : undefined,
        notes: we.notes,
        sets: we.sets.map((s) => ({
          reps: Number(s.reps) || 0,
          weight: Number(s.weight) || 0
        }))
      }))
    }

    try {
      await createWorkout(workoutPayload)
      alert("Workout logged successfully!")

      // Reset form
      setWorkoutExercises([
        {
          exerciseId: "",
          customExerciseName: "",
          notes: "",
          sets: [{ reps: "", weight: "" }]
        }
      ])
      setDate(new Date().toISOString().split("T")[0])
    } catch (err) {
      console.error("Error logging workout", err)
      alert("Something went wrong logging your workout")
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Log Workout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Workout Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {workoutExercises.map((we, index) => (
          <div key={index} className="card mb-4 p-3 shadow-sm">
            <div className="mb-3">
              <label className="form-label">Exercise</label>
              <select
                className="form-select"
                value={we.exerciseId}
                onChange={(e) => {
                  const updated = [...workoutExercises]
                  updated[index] = {
                    ...updated[index],
                    exerciseId: e.target.value,
                    customExerciseName: "" // reset custom name if not using it
                  }
                  setWorkoutExercises(updated)
                }}
              >
                <option value="">Select exercise</option>
                {availableExercises.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
                <option value="custom">➕ Custom Exercise</option>
              </select>
              {we.exerciseId === "custom" && (
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Enter custom exercise name"
                  value={we.customExerciseName}
                  onChange={(e) => {
                    const updated = [...workoutExercises]
                    updated[index] = {
                      ...updated[index],
                      customExerciseName: e.target.value
                    }
                    setWorkoutExercises(updated)
                  }}
                />
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Notes</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Focus on form"
                value={we.notes}
                onChange={(e) => {
                  setWorkoutExercises((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, notes: e.target.value } : item
                    )
                  )
                }}
              />
            </div>

            <h6>Sets</h6>
            {we.sets.map((set, sIdx) => (
              <div key={sIdx} className="row mb-2 align-items-center">
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Reps"
                    value={set.reps}
                    onChange={(e) => {
                      const value = Math.max(0, Number(e.target.value) || 0)
                      setWorkoutExercises((prev) =>
                        prev.map((we, i) =>
                          i === index
                            ? {
                                ...we,
                                sets: we.sets.map((s, j) =>
                                  j === sIdx ? { ...s, reps: value } : s
                                )
                              }
                            : we
                        )
                      )
                    }}
                    min="0"
                  />
                </div>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Weight"
                    value={set.weight}
                    onChange={(e) => {
                      const value = Math.max(0, Number(e.target.value) || 0)
                      setWorkoutExercises((prev) =>
                        prev.map((we, i) =>
                          i === index
                            ? {
                                ...we,
                                sets: we.sets.map((s, j) =>
                                  j === sIdx ? { ...s, weight: value } : s
                                )
                              }
                            : we
                        )
                      )
                    }}
                    min="0"
                  />
                </div>
                <div className="col-auto">
                  {we.sets.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        setWorkoutExercises((prev) =>
                          prev.map((we, i) =>
                            i === index
                              ? {
                                  ...we,
                                  sets: we.sets.filter((_, j) => j !== sIdx)
                                }
                              : we
                          )
                        )
                      }
                    >
                      ❌
                    </button>
                  )}
                </div>
                <div className="col-12">
                  <small className="text-muted">Set {sIdx + 1}</small>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm mt-2"
              onClick={() =>
                setWorkoutExercises((prev) =>
                  prev.map((we, i) =>
                    i === index
                      ? {
                          ...we,
                          sets: [...we.sets, { reps: "", weight: "" }]
                        }
                      : we
                  )
                )
              }
            >
              ➕ Add Set
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-outline-primary mb-3"
          onClick={() =>
            setWorkoutExercises([
              ...workoutExercises,
              {
                exerciseId: "",
                customExerciseName: "",
                notes: "",
                sets: [{ reps: "", weight: "" }]
              }
            ])
          }
        >
          ➕ Add Another Exercise
        </button>

        <button type="submit" className="btn btn-success w-100">
          ✅ Add Workout
        </button>
      </form>
    </div>
  )
}

export default WorkoutLogger
