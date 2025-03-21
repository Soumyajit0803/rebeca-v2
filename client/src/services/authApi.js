import api from './api'

export const authWithGoogle = (code) => api.get(`/auth/google?code=${code}`);
export const checkStatus = () => api.get(`/auth/status`);
export const logoutUser = () => api.get(`/auth/logout`);