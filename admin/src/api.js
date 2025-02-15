import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
});

export const authWithGoogle = (code) => API.get(`/admin/auth/google?code=${code}`);
export const checkStatus = () => API.get(`/admin/auth/status`);
export const logout = () => API.get(`/admin/auth/logout`);
export const validatePasskey = (passkey, admin) =>
    API.post("/admin/auth/validate-passkey", admin, {
        headers: {
            Authorization: `Bearer ${passkey}`
        },
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
    API.patch("/member/update", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });

export const deleteMember = (id) => API.delete(`/member/delete?_id=${id}`);

export const createEvent = (data) =>
    API.post("/event/create", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });

export const deleteEvent = (id) => API.delete(`/event/delete?_id=${id}`);

export const updateEvent = (data) =>
    API.patch("/event/update", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
export const getAllEvents = () => API.get("/event/all");