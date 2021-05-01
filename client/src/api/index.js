import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5005'})

export const signUp = (formData) => API.post('/signup', formData);

export const signIn = (formData) => API.post('/signin', formData);

export const fetchPlaces = () => API.get('/places')

export const fetchWaitingTime = () => API.get('/waitingtime');

export const fetchHistoricalTime = (name) => API.get(`/historicaltime/${name}`)

export const fetchHistoricalDays = (name) => API.get(`/historicaldays/${name}`)