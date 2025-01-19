import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

const AllRoutes = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Routes>
            <Route path="/" element={<EventRegistration />} />
        </Routes>
    );
};

export default AllRoutes;
