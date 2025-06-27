import React, { useEffect, useState } from 'react'
import { getExercises, deleteExercise } from '../api/exercises'
import AddExerciseForm from '../components/AddExerciseForm'
import ExerciseList from '../components/ExerciseList'

function Home() {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchExercises = async () => {
    try {
      const res = await getExercises()
      setExercises(res.data)
    } catch (err) {
      console.error("Error fetching exercises:", err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteExercise(id)
      fetchExercises()
    } catch (err) {
      console.error("Error deleting exercise", err)
    }
  }

  useEffect(() => {
    fetchExercises()
  }, [])

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Manage Exercises</h1>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Add New Exercise</h5>
            <AddExerciseForm onAdd={fetchExercises} />
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm">
            <ExerciseList 
              exercises={exercises} 
              loading={loading} 
              error={error}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
