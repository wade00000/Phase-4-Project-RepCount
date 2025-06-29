import React, { useState, useMemo } from "react"
import { Scatter } from "react-chartjs-2"
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from "chart.js"

ChartJS.register(PointElement, LinearScale, Tooltip, Legend, Title)

function RepsVsWeightChart({ workouts }) {
  const [selectedExercise, setSelectedExercise] = useState("")

  const allExercises = useMemo(() => {
    const names = new Set()
    workouts.forEach(workout => {
      workout.workout_exercises.forEach(we => {
        if (we.exercise?.name) names.add(we.exercise.name)
      })
    })
    return Array.from(names)
  }, [workouts])

  const dataPoints = useMemo(() => {
    const points = []
    workouts.forEach(workout => {
      workout.workout_exercises.forEach(we => {
        if (we.exercise?.name === selectedExercise) {
          we.sets.forEach(set => {
            points.push({
              x: set.weight,
              y: set.reps,
              date: workout.date
            })
          })
        }
      })
    })
    return points
  }, [workouts, selectedExercise])

  const chartData = {
    datasets: [
      {
        label: `Reps vs Weight (${selectedExercise})`,
        data: dataPoints,
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Reps vs Weight Chart"
      },
      tooltip: {
        callbacks: {
          label: ctx => {
            const { x, y } = ctx.raw
            return `${y} reps @ ${x} kg`
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Weight (kg)"
        }
      },
      y: {
        title: {
          display: true,
          text: "Reps"
        }
      }
    }
  }

  return (
    <div className="my-5">
      <select
        className="form-select my-3"
        value={selectedExercise}
        onChange={e => setSelectedExercise(e.target.value)}
      >
        <option value="">-- Select Exercise --</option>
        {allExercises.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      {selectedExercise && <Scatter data={chartData} options={options} />}
    </div>
  )
}

export default RepsVsWeightChart
