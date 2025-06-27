import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  PointElement,
  Tooltip,
  Legend,
  LinearScale,
  Title
} from 'chart.js';

ChartJS.register(PointElement, Tooltip, Legend, LinearScale, Title);

function RepsVsWeightChart({ workouts, availableExercises }) {
  const [selectedExerciseId, setSelectedExerciseId] = useState("");

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
    );

  const chartData = {
    datasets: [
      {
        label: 'Reps vs Weight',
        data: filteredSets.map((s) => ({ x: s.reps, y: s.weight })),
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Reps vs Weight Chart'
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Reps' }
      },
      y: {
        title: { display: true, text: 'Weight (kg)' }
      }
    }
  };

  return (
    <div>
      <h3>Reps vs Weight (by Exercise)</h3>
      <select
        value={selectedExerciseId}
        onChange={(e) => setSelectedExerciseId(e.target.value)}
      >
        <option value="">Select Exercise</option>
        {availableExercises.map((ex) => (
          <option key={ex.id} value={ex.id}>
            {ex.name}
          </option>
        ))}
      </select>

      {selectedExerciseId && filteredSets.length > 0 ? (
        <Scatter data={chartData} options={chartOptions} />
      ) : selectedExerciseId ? (
        <p>No sets logged for that exercise.</p>
      ) : null}
    </div>
  );
}

export default RepsVsWeightChart;
