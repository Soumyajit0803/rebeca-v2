import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./screens/Home/Home";
import Schedule from "./screens/Schedule/Schedule";
import Sponsorship from "./screens/Sponsors/Sponsorship";

import Daydetails from "./screens/Daydetails/Daydetails";
import Merchandise from "./screens/Merchandise/Merchandise";
import Team from "./screens/Team/Team";
import EventSingle from "./screens/EventSingle/EventSingle";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import EventReg from "./components/EventReg/EventReg";
import PageNotFound from "./screens/PageNotFound/PageNotFound";
import ComingSoon from "./screens/ComingSoon/ComingSoon";

const AllRoutes = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/events" element={<Schedule />} />
            <Route exact path="/events/day/:DayID" element={<Daydetails />} />
            <Route exact path="/events/:eventSlug" element={<EventSingle />} />
            <Route exact path="/sponsorship" element={<Sponsorship />} />
            <Route exact path="/team" element={<Team />} />
            <Route exact path="/merchandise" element={<Merchandise />} />
            <Route exact path="/profile" element={<ProfileInfo />} />
            <Route exact path="/events/:eventSlug/register" element={<EventReg />} />
            <Route exact path="/*" element={<PageNotFound />} />
        </Routes>
    );
};

export default AllRoutes;
