import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AddExerciseForm from './components/AddExerciseForm'
import ExerciseList from './components/ExerciseList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AddExerciseForm />
    <ExerciseList />
  </StrictMode>,
)
