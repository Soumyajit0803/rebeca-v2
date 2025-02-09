import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
});

export const postImage = (data) =>
    API.post("/profile/upload?upload_preset=rebeca", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const createMember = (data) =>
    API.post("/member/create", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
export const getAllMembers = () => API.get("/member/all");

export const updateMember = (data) =>
    API.post("/member/update", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });

export const deleteMember = (id) =>
    API.delete(`/member/delete?_id=${id}`);
