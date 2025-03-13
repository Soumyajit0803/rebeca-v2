import api from "./api";

export const updateMember = (data) =>
    api.patch("/member/update", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
export const getAllMembers = () => api.get("/member/all");
