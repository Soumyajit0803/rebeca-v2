import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./screens/Home/Home";
import Schedule from "./screens/Schedule/Schedule";
import Sponsorship from "./screens/Sponsors/Sponsorship";

import Daydetails from "./screens/Daydetails/Daydetails";
import EventPopup2 from "./screens/EventPopup/EventPopup2";
import Merchandise from "./screens/Merchandise/Merchandise";
import Team from "./screens/Team/Team";
import LoginForm from "./components/Login/LoginForm";
//import UserRegistration from "./screens/UserRegistration/UserRegistration";
import EventSingle from "./screens/EventSingle/EventSingle";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import EventReg from "./components/EventReg/EventReg";
import RoundCard from "./screens/EventSingle/RoundCard";

const AllRoutes = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/events" element={<Schedule />} />
            <Route exact path="/events/:DayID" element={<Daydetails />} />
            <Route exact path="/event/:eventSlug" element={<EventSingle />} />
            <Route exact path="/sponsorship" element={<Sponsorship />} />
            <Route exact path="/team" element={<Team />} />
            <Route exact path="/merchandise" element={<Merchandise />} />
            <Route exact path="/profile" element={<ProfileInfo />} />
            <Route exact path="/event/:eventSlug/register" element={<EventReg />} />
        </Routes>
    );
};

export default AllRoutes;
