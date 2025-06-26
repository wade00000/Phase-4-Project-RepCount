import React, { useEffect, useState } from 'react';
import {getExercises} from './api/exercises'
import AddExerciseForm from './components/AddExerciseForm';
import ExerciseList from './components/ExerciseList';

function Home() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExercises = async () => {
    try {
      const res = await getExercises();
      setExercises(res.data);
    } catch (err) {
      console.error("Error fetching exercises:", err);
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
      <ExerciseList exercises={exercises} loading={loading} />
    </div>
  );
}

export default Home;
