import React, {useEffect} from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Home from "./screens/Home/Home";


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
			
			
		</Routes>
	);
};

export default AllRoutes