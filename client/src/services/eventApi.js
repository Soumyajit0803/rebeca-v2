import api from './api'

export const enrollUser = (data) =>
    api.post("/eventreg/enroll", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
export const isUserRegistered = (eventId, userId) => api.get(`/eventreg/isUserRegistered?eventId=${eventId}&userId=${userId}`);

export const getAllMembersNotInEvent = (eventId) => api.get(`/eventreg/getAllNotInEvent?eventId=${eventId}`);