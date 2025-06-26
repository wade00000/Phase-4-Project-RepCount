import axios from './axios';

export const createWorkout = (payload) => {
  return axios.post('/workouts', payload);
};

export const getWorkouts = () => {
  return axios.get('/workouts');
};