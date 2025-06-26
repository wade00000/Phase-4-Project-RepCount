import api from './axios'
import axios from './axios';

export const getExercises = () => api.get('/exercises')
export const createExercise = (data) => api.post('/exercises', data)
export const deleteExercise = (id) => {
  return axios.delete(`/exercises/${id}`);
};