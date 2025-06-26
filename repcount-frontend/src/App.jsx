import React, { useEffect, useState } from 'react';
import {getExercises,deleteExercise} from './api/exercises'
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

  const handleDelete = async (id) => {
  try {
    await deleteExercise(id);
    fetchExercises(); // refresh the list
  } catch (err) {
    console.error("Error deleting exercise", err);
  }
};


  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div>
      <AddExerciseForm onAdd={fetchExercises} />
      <ExerciseList 
      exercises={exercises} 
      loading={loading} 
      error={error}
      onDelete={handleDelete}
      />
    </div>
  );
}

export default Home;
