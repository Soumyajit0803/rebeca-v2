import api from './api'

export const enrollUser = (data) =>
    api.post("/eventreg/enroll", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
export const isUserRegistered = (eventId, userId) => api.get(`/eventreg/isUserRegistered?eventId=${eventId}&userId=${userId}`);

export const getAllMembersNotInEvent = (eventId) => api.get(`/eventreg/getAllNotInEvent?eventId=${eventId}`);

export const getAllEvents = () => api.get(`/event/all?email=null`)