import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./screens/Home/Home";
import Schedule from "./screens/Schedule/Schedule";
import Sponsorship from "./screens/Sponsors/Sponsorship";

import Daydetails from "./screens/Daydetails/Daydetails";
import EventPopup from "./screens/EventPopup/EventPopup";
import Merchandise from "./screens/Merchandise/Merchandise";
import Team from "./screens/Team/Team";
import LoginForm from "./components/Login/LoginForm";
import UserRegistration from "./screens/UserRegistration/UserRegistration";
import EventSingle from "./screens/EventSingle/EventSingle";

const AllRoutes = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route
                exact
                path="/events"
                element={
                    <Schedule></Schedule>
                    // <Autocarousel />
                }
            ></Route>
            <Route exact path="/events/:DayID" element={<Daydetails />} />
            <Route exact path="/event/:eventName" element={<EventPopup />} />
            <Route exact path="/sponsorship" element={<Sponsorship></Sponsorship>}></Route>
            <Route exact path="/team" element={<Team></Team>}></Route>
            <Route exact path="/merchandise" element={<Merchandise></Merchandise>}></Route>
            <Route exact path="/register" element={<UserRegistration />} />
            <Route exact path="/test" element={<EventSingle />} />
        </Routes>
    );
};

export default AllRoutes;
