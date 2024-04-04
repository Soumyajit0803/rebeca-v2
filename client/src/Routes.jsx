import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./screens/Home/Home";
import Schedule from "./screens/Schedule/Schedule";
import Sponsorship from "./screens/Sponsors/Sponsorship";

import Daydetails from "./screens/Daydetails/Daydetails";
import EventPopup from "./screens/EventPopup/EventPopup";
import Merchandise from "./screens/Merchandise/Merchandise";
import Team from "./screens/Team/Team";

const AllRoutes = ({
  login,
  logout,
  user,
  emailVerificationOpen,
  authOpen,
  onAuthOpen,
  onAuthClose,
  onEmailverifyOpen,
  onEmailverifyClose,
}) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
		<Routes>
			<Route
				exact
				path="/"
				element={
					<Home
						onAuthClose={onAuthClose}
						onAuthOpen={onAuthOpen}
						onEmailverifyOpen={onEmailverifyOpen}
						onEmailverifyClose={onEmailverifyClose}
						authOpen={authOpen}
						emailVerificationOpen={emailVerificationOpen}
						login={login}
						logout={logout}
						user={user}
					></Home>
				}
			></Route>
			<Route
				exact
				path="/events"
				element={
					<Schedule
						onAuthClose={onAuthClose}
						onAuthOpen={onAuthOpen}
						onEmailverifyOpen={onEmailverifyOpen}
						onEmailverifyClose={onEmailverifyClose}
						authOpen={authOpen}
						emailVerificationOpen={emailVerificationOpen}
						login={login}
						logout={logout}
						user={user}
					></Schedule>
					// <Autocarousel />
				}
			></Route>
			<Route exact path="/events/:DayID" element={<Daydetails />} />
			<Route exact path="/event/:eventName" element={<EventPopup />} />
			<Route
				exact
				path="/sponsorship"
				element={
					<Sponsorship
						onAuthClose={onAuthClose}
						onAuthOpen={onAuthOpen}
						onEmailverifyOpen={onEmailverifyOpen}
						onEmailverifyClose={onEmailverifyClose}
						authOpen={authOpen}
						emailVerificationOpen={emailVerificationOpen}
						login={login}
						logout={logout}
						user={user}
					></Sponsorship>
				}
			></Route>
			<Route
				exact
				path="/team"
				element={
					<Team
						onAuthClose={onAuthClose}
						onAuthOpen={onAuthOpen}
						onEmailverifyOpen={onEmailverifyOpen}
						onEmailverifyClose={onEmailverifyClose}
						authOpen={authOpen}
						emailVerificationOpen={emailVerificationOpen}
						login={login}
						logout={logout}
						user={user}
					></Team>
				}
			></Route>
			<Route
				exact
				path="/merchandise"
				element={
					<Merchandise
						onAuthClose={onAuthClose}
						onAuthOpen={onAuthOpen}
						onEmailverifyOpen={onEmailverifyOpen}
						onEmailverifyClose={onEmailverifyClose}
						authOpen={authOpen}
						emailVerificationOpen={emailVerificationOpen}
						login={login}
						logout={logout}
						user={user}
					></Merchandise>
				}
			></Route>
		</Routes>
  );
};

export default AllRoutes;
