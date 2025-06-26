import React, { useState, useEffect } from 'react' 
import { getExercises } from '../api/exercises' 

function ExerciseList() {
  const [exercises, setExercises] = useState([]) 
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState(null) 

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await getExercises() 
        setExercises(response.data) 
      } catch (err) {
        setError("Something went wrong.") 
      } finally {
        setLoading(false) 
      }
    } 

    fetchExercises() 
  }, []) 

  if (loading) return <p>Loading...</p> 
  if (error) return <p>{error}</p> 

  return (
    <div>
      <h2>Exercises</h2>
      {exercises.length === 0 ?(
        <p>No exercises found.</p>
      ):(
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
        )}
    </div>
  ) 
}

export default ExerciseList 
