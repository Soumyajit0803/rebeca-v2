import { useState } from "react";
import "./App.css";
import Schedule from "./components/Schedule/Schedule";
// import AllRoutes;
import { BrowserRouter, Route , Routes} from "react-router-dom";


function App() {
	// const [user, setUser] = useState(
	// 	JSON.parse(localStorage.getItem("user")) || null
	// );
	// const [authOpen, setAuthOpen] = useState(false);
	// const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);

	// const login = (userData, jwt) => {
	// 	setUser(userData);
	// 	localStorage.setItem("user", JSON.stringify(userData));
	// 	localStorage.setItem("jwt", JSON.stringify(jwt));
	// };
	// const logout = () => {
	// 	setUser(null);
	// 	localStorage.setItem("user", JSON.stringify(null));
	// 	localStorage.removeItem("jwt");
	// };

	// const handleAuthOpen = () => {
	// 	setAuthOpen(true);
	// };
	// const handleAuthClose = () => {
	// 	setAuthOpen(false);
	// };

	return (
		<div className="App">
			<BrowserRouter>
			<Routes>
				<Route path="schedule" element={<Schedule />}/>
			</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
