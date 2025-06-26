import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; // Assuming this is your axios instance

function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get('/workouts'); // We'll confirm the route
        setWorkouts(res.data);
      } catch (err) {
        setError("Failed to fetch workouts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Workout History</h2>
     {workouts.map((workout) => (
  <div key={workout.id} className="workout">
    <h3>Workout Date: {new Date(workout.date).toLocaleDateString()}</h3>

    {workout.workout_exercises.map((we) => (
      <div key={we.id} className="exercise">
        <h4>{we.exercise?.name || "Unknown Exercise"}</h4>
        <p>Notes: {we.notes}</p>
        <ul>
          {we.sets.map((set) => (
            <li key={set.id}>
              Reps: {set.reps}, Weight: {set.weight}kg
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
))}


    </div>
  );
}

export default WorkoutHistory;
