import React, { createContext, useContext, useState, useEffect } from "react";
import { logoutUser } from "./services/authApi";
import useNotification from "./hooks/useNotification";
import { getAllEvents } from "./services/eventApi";
import { getAllAdmins } from "./services/userApi";
import {
    AdminPanelSettings,
    AttachMoney,
    Palette,
    Event,
    Info,
    DirectionsBus,
    Handshake,
    Article,
    Campaign,
    Brush,
    Groups,
    Code,
    Restaurant,
    VolunteerActivism,
    CameraAlt,
    AssignmentInd,
    AccountBalance,
    MenuBook,
} from "@mui/icons-material";

const AuthContext = createContext();

export const skeleton = [
    { id: 1, team: "Secretary General", members: [], icon: <AdminPanelSettings /> },
    { id: 2, team: "Finance", members: [], icon: <AttachMoney /> },
    { id: 3, team: "Cultural", members: [], icon: <Palette /> },
    { id: 4, team: "Event", members: [], icon: <Event /> },
    { id: 5, team: "Resource Information", members: [], icon: <Info /> },
    { id: 6, team: "Travel and Logistics", members: [], icon: <DirectionsBus /> },
    { id: 7, team: "Sponsorship", members: [], icon: <Handshake /> },
    { id: 8, team: "Publication", members: [], icon: <Article /> },
    { id: 9, team: "Publicity", members: [], icon: <Campaign /> },
    { id: 10, team: "Stage Decoration", members: [], icon: <Brush /> },
    { id: 11, team: "Business and Alumni Meet", members: [], icon: <Groups /> },
    { id: 12, team: "Competitions and Seminars", members: [], icon: <Code /> },
    { id: 13, team: "Web Development", members: [], icon: <Code /> },
    { id: 14, team: "Refreshments", members: [], icon: <Restaurant /> },
    { id: 15, team: "Volunteers", members: [], icon: <VolunteerActivism /> },
    { id: 16, team: "Photography", members: [], icon: <CameraAlt /> },
    { id: 17, team: "Joint Secretary", members: [], icon: <AssignmentInd /> },
    { id: 18, team: "Fixed Signatory", members: [], icon: <AccountBalance /> },
    { id: 19, team: "BECA Magazine", members: [], icon: <MenuBook /> },
];

const teamNameToId = {
    "Secretary General": 1,
    Finance: 2,
    Cultural: 3,
    Event: 4,
    "Resource Information": 5,
    "Travel and Logistics": 6,
    Sponsorship: 7,
    Publication: 8,
    Publicity: 9,
    "Stage Decoration": 10,
    "Business and Alumni Meet": 11,
    "Competitions and Seminars": 12,
    "Web Development": 13,
    Refreshments: 14,
    Volunteers: 15,
    Photography: 16,
    "Joint Secretary": 17,
    "Fixed Signatory": 18,
    "BECA Magazine": 19,
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoad, setUserLoad] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const [eventsLoad, setEventsLoad] = useState(false)
    
    const [teamsData, setTeamsData] = useState(skeleton);
    const [teamsLoad, setTeamsLoad] = useState(false);

    useEffect(() => {
            const handleFetchAdmins = async () => {
                try {
                    setTeamsLoad(true);
                    const res = await getAllAdmins();
                    const admins = res.data?.data;
                    console.log(admins);
                    const nteamsData = JSON.parse(JSON.stringify(skeleton));
                    admins.map((admin) => {
                        var index = teamNameToId[admin.team];
                        nteamsData[index - 1]?.members.push(admin);
                    });
                    setTeamsData(nteamsData);
                } catch (err) {
                    console.log(err);
                } finally {
                    setTeamsLoad(false);
                }
            };
    
            handleFetchAdmins();
        }, []);


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
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, allEvents, setAllEvents, eventsLoad, userLoad, setUserLoad, teamsData, teamsLoad }}>
            <Notification />
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
