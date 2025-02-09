import axios from 'axios';

const api = axios.create({
   
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,

});

export const authWithGoogle = (code) => api.get(`/auth/google?code=${code}`);
export const checkStatus = () => api.get(`/auth/status`);
export const logoutUser = () => api.get(`/auth/logout`);