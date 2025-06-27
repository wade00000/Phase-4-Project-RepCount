import React from 'react'

function ExerciseList({ exercises, loading, error, onDelete }) {
  if (loading) return <p className="text-muted">Loading...</p>
  if (error) return <p className="text-danger">{error}</p>

  return (
    <div className="mt-4">
      <h2 className="mb-3">Exercises</h2>
      {exercises.length === 0 ? (
        <p className="text-secondary">No exercises found</p>
      ) : (
        <ul className="list-group">
          {exercises.map((exe) => (
            <li
              key={exe.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {exe.name}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDelete(exe.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExerciseList
