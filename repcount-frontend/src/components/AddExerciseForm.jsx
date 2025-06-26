import React, { useState,useEffect } from 'react'
import { createExercise } from '../api/exercises'

function AddExerciseForm(){
    const [name,setName] = useState("")
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)



    useEffect(() => {
    if (message) {
        const timer = setTimeout(() => setMessage(null), 3000);
        return () => clearTimeout(timer);
    }
    }, [message])
    


    const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    try {
      setLoading(true)
      await createExercise({ name })
      setMessage("Exercise added!")
      setName("") // Clears the input
    } catch (err) {
      setMessage("Error adding exercise.");
      console.error(err)
    }finally{
        setLoading(false)
    }
}
    

  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Exercise"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" disabled={loading ||!name.trim()}>
        {loading ? "Adding...":"Add"}
      </button>
      {message && <p>{message}</p>}
    </form>
  )
}

export default AddExerciseForm;
