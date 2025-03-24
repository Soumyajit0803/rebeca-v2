import api from "./api";

export const updateMember = (data) =>
    api.patch("/member/update", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
export const getAllAdmins = () => api.get("/member/all?admin=true");
