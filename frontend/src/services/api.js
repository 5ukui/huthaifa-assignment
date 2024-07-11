import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
console.log('API Base URL:', process.env.REACT_APP_API_URL); // Add this line for debugging
export default api;
