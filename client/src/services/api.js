import axios from 'axios';

const api = axios.create({
   
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,

});

export const authWithGoogle = (code) => api.get(`/auth/google?code=${code}`);
export const checkStatus = () => api.get(`/auth/status`);
export const logoutUser = () => api.get(`/auth/logout`);
export const updateMember = (data) =>
    api.patch("/member/update", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
export const getAllMembers = () => api.get("/member/all");
export const postImage = (data) =>
    api.post("/profile/upload?upload_preset=rebeca", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });