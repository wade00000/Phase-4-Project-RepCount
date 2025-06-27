import React, { useState, useEffect } from 'react';
import { createExercise } from '../api/exercises';

function AddExerciseForm({ onAdd }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      await createExercise({ name });
      setMessage('Exercise added!');
      setName('');
      onAdd?.();
    } catch (err) {
      setMessage('Error adding exercise.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-sm mb-4"
      style={{ maxWidth: '500px', margin: 'auto' }}
    >
      <h5 className="mb-3 fw-semibold text-primary">Add a New Exercise</h5>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control rounded-pill ps-4"
          id="exerciseName"
          placeholder="Exercise name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="exerciseName">Exercise name</label>
      </div>

      <button
        type="submit"
        className="btn btn-outline-primary w-100 rounded-pill py-2"
        disabled={loading || !name.trim()}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Adding...
          </>
        ) : (
          'Add Exercise'
        )}
      </button>

      {message && (
        <div
          className={`alert mt-3 rounded-pill text-center ${
            message.includes('Error') ? 'alert-danger' : 'alert-success'
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}

export default AddExerciseForm;
