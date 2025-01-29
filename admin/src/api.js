import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1",
});

export const postImage = (data) =>
    API.post("/profile/upload?upload_preset=rebeca", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const createMember = (data) => API.post("/member/create", data)