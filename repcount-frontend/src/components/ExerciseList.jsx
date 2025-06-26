import React, { useState, useEffect } from 'react' 
import { getExercises } from '../api/exercises' 

function ExerciseList({exercises,loading,error,onDelete}) {
  

  if (loading) return <p>Loading...</p> 
  if (error) return <p>{error}</p> 

  return (
    <div>
      <h2>Exercises</h2>
      {exercises.length === 0 ?(
        <p>No exercises found.</p>
      ):(
      <ul>
        {exercises.map((exe) => (
          <li key={exe.id}>
            {exe.name}
            <button onClick={() => onDelete(exe.id)}>❌</button>
            </li>
        ))}
      </ul>
        )
      }
    </div>
  ) 
}

export default ExerciseList 
