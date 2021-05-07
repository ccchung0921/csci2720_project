import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5005'})

export const signUp = (formData) => API.post('/signup', formData);

export const signIn = (formData) => API.post('/signin', formData);

export const fetchPlaces = () => API.get('/places')

export const fetchWaitingTime = () => API.get('/waitingtime');

export const fetchHistoricalTime = (name) => API.get(`/historicaltime/${name}`)

export const fetchHistoricalDays = (name) => API.get(`/historicaldays/${name}`)

export const fetchFavourite = (id) => API.get(`/favourite/${id}`);

export const addFavourite = (id,place) => API.post(`/favourite/add/${id}`,place)

export const removeFavourite = (id,place) => API.post(`/favourite/remove/${id}`,place)

export const addComment = (comment) => API.post('/comment',comment);

export const getComment = (id) => API.get(`/comment/place/${id}`);

export const getUserComment = (id) => API.get(`/comment/user/${id}`);

export const getUserinfo = (id) => API.get(`/user/${id}`);

export const addPlaces = (place) => API.post('place',place);

export const deletePlace = (id) => API.delete(`place/${id}`);

export const updatePlace = (id,updated) => API.patch(`place/${id}`,updated);

export const getUsers = () => API.get('users');

export const addUser = (user) => API.post('user',user);

export const deleteUser = (id) => API.delete(`user/${id}`);

export const updateUser = (id,updated) => API.patch(`user/${id}`,updated);