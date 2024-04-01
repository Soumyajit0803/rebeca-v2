import { useState } from "react";
import "./App.css";
import AllRoutes from "./Routes.jsx";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer.jsx";
function App() {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	const [authOpen, setAuthOpen] = useState(false);
	const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);

	const login = (userData, jwt) => {
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
		localStorage.setItem("jwt", JSON.stringify(jwt));
	};
	const logout = () => {
		setUser(null);
		localStorage.setItem("user", JSON.stringify(null));
		localStorage.removeItem("jwt");
	};

	const handleAuthOpen = () => {
		setAuthOpen(true);
	};
	const handleAuthClose = () => {
		setAuthOpen(false);
	};

	return (
		<div className="App">
			<Router>
				<Navbar></Navbar>
				<AllRoutes
					onAuthClose={handleAuthClose}
					onAuthOpen={handleAuthOpen}
					authOpen={authOpen}
					user={user}
					login={login}
					logout={logout}
				></AllRoutes>
				<Footer></Footer>
			</Router>
		</div>
	);
}

export default App;
