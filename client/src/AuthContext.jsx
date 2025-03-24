import React, { createContext, useContext, useState, useEffect } from "react";
import { logoutUser } from "./services/authApi";
import useNotification from "./hooks/useNotification";
import { getAllEvents } from "./services/eventApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allEvents, setAllEvents] = useState([]);
    const [eventsLoad, setEventsLoad] = useState(false)

    useEffect(() => {
        const handleGetAllEvents = async () => {
            try {
                setEventsLoad(true)
                const response = await getAllEvents();
                const allEvs = response.data.data;
                allEvs.map((ev)=>{
                    ev["slug"] = ev.eventName.toLowerCase().replace(/\s+/g, "-");
                })
                setAllEvents(allEvs);
                console.log("Event data fetched successfully");
                console.log(allEvs);
            } catch (err) {
                console.log(err);
            } finally {
                setEventsLoad(false)
            }
        };

        handleGetAllEvents();
    }, []);

    const { Notification, showNotification } = useNotification();

    const handleLogin = (userData) => {
        console.log("User login successful");
        console.log(userData);
        setUser(userData);
        showNotification(`Welcome, ${userData.name.split(" ")[0]}`);
    };

    const handleLogout = async () => {
        // Implement logout logic here
        console.log("Logout the user!");
        try {
            const res = await logoutUser();
            console.log(res);
            showNotification("Logout successfully");
            setUser(null);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, allEvents, setAllEvents, eventsLoad }}>
            <Notification />
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
