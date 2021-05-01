import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5005'})

export const fetchPlaces = () => API.get('/places')

export const fetchWaitingTime = () => API.get('/waitingtime');

export const fetchHistoricalTime = (name) => API.get(`/historicaltime/${name}`)

export const fetchHistoricalDays = (name) => API.get(`/historicaldays/${name}`)