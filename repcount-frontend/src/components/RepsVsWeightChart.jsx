import React, { useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  PointElement,
  Tooltip,
  Legend,
  LinearScale,
  Title
} from 'chart.js'

ChartJS.register(PointElement, Tooltip, Legend, LinearScale, Title)

function RepsVsWeightChart({ workouts, availableExercises }) {
  const [selectedExerciseId, setSelectedExerciseId] = useState("")

  const filteredSets = workouts
    .flatMap((w) =>
      w.workout_exercises
        .filter((we) => Number(we.exercise_id) === Number(selectedExerciseId))
        .flatMap((we) =>
          we.sets.map((s) => ({
            reps: Number(s.reps),
            weight: Number(s.weight)
          }))
        )
    )

  const chartData = {
    datasets: [
      {
        label: 'Reps vs Weight',
        data: filteredSets.map((s) => ({ x: s.reps, y: s.weight })),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointRadius: 5
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Reps vs Weight'
      },
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Reps' },
        beginAtZero: true
      },
      y: {
        title: { display: true, text: 'Weight (kg)' },
        beginAtZero: true
      }
    }
  }

  return (
    <div className="mt-5">
      <h3 className="mb-3">Reps vs Weight Chart</h3>

      <select
        className="form-select mb-4"
        value={selectedExerciseId}
        onChange={(e) => setSelectedExerciseId(e.target.value)}
      >
        <option value="">Select an exercise</option>
        {availableExercises.map((ex) => (
          <option key={ex.id} value={ex.id}>
            {ex.name}
          </option>
        ))}
      </select>

      {selectedExerciseId && filteredSets.length > 0 ? (
        <div className="chart-container bg-light p-3 rounded shadow-sm">
          <Scatter data={chartData} options={chartOptions} />
        </div>
      ) : selectedExerciseId ? (
        <p className="text-muted">No sets logged for this exercise</p>
      ) : null}
    </div>
  )
}

export default RepsVsWeightChart
