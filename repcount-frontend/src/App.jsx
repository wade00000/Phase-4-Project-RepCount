import React, { useEffect, useState } from 'react';
import {getExercises} from './api/exercises'
import AddExerciseForm from './components/AddExerciseForm';
import ExerciseList from './components/ExerciseList';

function Home() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(null)

  const fetchExercises = async () => {
    try {
      const res = await getExercises();
      setExercises(res.data);
    } catch (err) {
      console.error("Error fetching exercises:", err);
      setError(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div>
      <AddExerciseForm onAdd={fetchExercises} />
      <ExerciseList exercises={exercises} loading={loading} error={error} />
    </div>
  );
}

export default Home;
