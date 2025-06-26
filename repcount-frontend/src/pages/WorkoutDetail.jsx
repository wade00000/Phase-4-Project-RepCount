import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios"; // or wherever your base axios is

function WorkoutDetail() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await axios.get(`/workouts/${id}`);
        setWorkout(res.data);
      } catch (err) {
        console.error("Error fetching workout:", err);
        setError("Failed to load workout.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  if (loading) return <p>Loading workout...</p>;
  if (error) return <p>{error}</p>;
  if (!workout) return <p>No workout found.</p>;

  return (
    <div>
      <Link to="/">← Back</Link>
      <h2>Workout on {new Date(workout.date).toLocaleDateString()}</h2>

      {workout.workout_exercises.map((we, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h3>{we.exercise?.name || "Unnamed Exercise"}</h3>
          {we.notes && <p><em>Notes:</em> {we.notes}</p>}

          <ul>
            {we.sets.map((set, idx) => (
              <li key={idx}>
                {set.reps} reps @ {set.weight}kg
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default WorkoutDetail;
