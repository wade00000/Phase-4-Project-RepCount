import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function calculateWorkoutVolumes(workouts) {
  return workouts.map(workout => {
    const totalVolume = workout.workout_exercises.reduce((weAcc, we) => {
      const weVolume = we.sets.reduce((setAcc, set) => {
        return setAcc + (set.reps * set.weight);
      }, 0);
      return weAcc + weVolume;
    }, 0);

    return {
      date: new Date(workout.date).toLocaleDateString(),
      volume: totalVolume
    };
  });
}

export default function WorkoutVolumeChart({ workouts }) {
  const workoutVolumes = calculateWorkoutVolumes(workouts);

  const data = {
    labels: workoutVolumes.map(w => w.date),
    datasets: [
      {
        label: 'Workout Volume',
        data: workoutVolumes.map(w => w.volume),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        callbacks: {
          label: ctx => `Volume: ${ctx.raw} kg`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Volume (kg)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Workout Date'
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
}
