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
            'Content-Type': 'application/json',
        },
    });
