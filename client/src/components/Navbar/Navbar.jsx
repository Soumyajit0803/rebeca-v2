import { useState, useEffect } from "react";
import {
	Drawer,
	Divider,
	Avatar,
	Menu,
	MenuItem,
	IconButton,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Stack
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import Button from "../../atoms/Button/Button";
import "./Navbar.css";
import ComingSoonDialog from "../ComingSoonDialog/ComingSoonDialog";
import AuthForm from "../AuthForm/AuthForm";
import VerifyForm from "../VerifyForm/VerifyForm";
import { logoutAuth } from "../../../services/api";
import { alert } from "../../molecules/CustomAlert/alert";
import UserMenu from "../UserMenu/UserMenu";


const Navbar = ({
	user,
	login,
	logout,
	emailVerificationOpen,
	authOpen,
	onAuthOpen,
	onAuthClose,
	onEmailverifyOpen,
	onEmailverifyClose,
}) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	// const [authOpen, setAuthOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	// const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);
	const [menuItems, setMenuItems] = useState([]);
	const menuOpen = Boolean(anchorEl);

	const { innerWidth: width, innerHeight: height } = window;
	// console.log(width, height);

	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};
	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	const handleMenuOpen = (event) => {
		// handleSetMenuItems(event.currentTarget.id);
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
		// return navigate("/");
	};
	// This func will be needed to generalize menus in navbar ->
	const handleSetMenuItems = (id) => {
		const items = [];
		switch (id) {
			case "nav-avatar": {
				items.push(...[
					
					{
						name: "Help",
						func: null,
					},
					{
						name: "Log out",
						func: handleLogout,
					},
				]);
				break;
			}
		}
		console.log(items);
		setMenuItems(items);
	};

	const handleLogout = () => {
		setAnchorEl(null);
		const logginOut = async () => {
			try {
				await logoutAuth();
				logout();
				window.location.reload();
			} catch (err) {
				alert({ message: err.response.data.message || err.message, type: "error" });
			}
		};
		logginOut();
	};

	const handleLinkClick = () => {
		// setMenuOpen(false);
		handleDrawerClose();
	};

	const handleAuthOpen = () => {
		onAuthOpen();
	};
	const handleAuthClose = () => {
		onAuthClose;
	};

	const handleEmailverifyOpen = () => {
		onEmailverifyOpen;
	};
	const handleEmailverifyClose = () => {
		onEmailverifyClose;
	};

	return (
		<>
			<div className="navbar">
				<div className="left-col">
					<Link to="/" className="logo">
						<div>
							<img
								src="/assets/logo/logo-full-black.png"
								alt=""
							/>
						</div>
					</Link>

					{width <= 720 && (
						<>
							<Button
								id="drawer-open-btn"
								onClick={handleDrawerOpen}
								variant="filled"
								color="white"
								innerText={
									<span
										className="material-icons"
										style={{ color: "var(--red)" }}
									>
										menu
									</span>
								}
							></Button>
						</>
					)}
				</div>

				<div className="nav-items">
					{width >= 720 && (
						<>
							<NavLink id="nav-home" className={"item"} to="/">
								Home
							</NavLink>
							<NavLink
								id="nav-resorts"
								className={"item"}
								to="/resorts"
							>
								Resorts
							</NavLink>
							<NavLink
								id="nav-membership"
								className={"item"}
								to="/membership"
							>
								Membership
							</NavLink>
							<NavLink
								to="/about"
								id="nav-about"
								className={"item"}
							>
								About Us
							</NavLink>
							<NavLink
								id="nav-contact"
								to="/contact"
								className={"item"}
							>
								Contact Us
							</NavLink>
							<NavLink id="nav-faq" to="/faq" className={"item"}>
								FAQs
							</NavLink>
							{user ? (
								<div
									className="item"
									id="nav-avatar"
									onClick={(e) => handleMenuOpen(e)}
									// onMouseOut={handleMenuClose}
								>
									<Avatar
										alt={user.name}
										src={user.image}
									></Avatar>
									<span className="material-icons">
										arrow_drop_down
									</span>
								</div>
							) : (
								<div className="item">
									<Button
										// size="large"
										variant="filled"
										color="red"
										innerText={"Log in"}
										onClick={handleAuthOpen}
									></Button>
									{/* <ComingSoonDialog open={dialogOpen}></ComingSoonDialog> */}
								</div>
							)}
						</>
					)}
				</div>
			</div>
			<Drawer
				variant="persistent"
				anchor="left"
				open={drawerOpen}
				className="drawer"
			>
				<Button
					id="drawer-close-btn"
					onClick={handleDrawerClose}
					variant="text"
					color="purple"
					size="large"
					className={"drawer-close-btn"}
					innerText={<span className="material-icons">close</span>}
				></Button>
				{/* <div className="title">Good Times Vacation</div> */}
				<Divider />
				<div className="nav-items">
					<NavLink
						className={"item"}
						to="/"
						onClick={handleLinkClick}
					>
						Home
					</NavLink>
					<NavLink
						className={"item"}
						to="/resorts"
						onClick={handleLinkClick}
					>
						Resorts
					</NavLink>
					<NavLink
						className={"item"}
						to="/membership"
						onClick={handleLinkClick}
					>
						Membership
					</NavLink>
					<NavLink
						to="/about"
						onClick={handleLinkClick}
						className={"item"}
					>
						About Us
					</NavLink>
					<NavLink
						to="/contact"
						onClick={handleLinkClick}
						className={"item"}
					>
						Contact Us
					</NavLink>
					<NavLink
						onClick={handleLinkClick}
						to="/faq"
						className={"item"}
					>
						FAQs
					</NavLink>

					{user ? (
						<div className="item" id="nav-avatar">
							<Accordion
								sx={{
									background: "none",
									color: "black",
									border: "0px solid rgba(150, 150, 150, 0.30)",
									borderRadius: "5px",
									// margin: "10px 0",
									width: {
										xs: "100%",
										md: "100%",
										xl: "100%",
									},
									p: "0px 0px",
									boxShadow: "none",
									"&.MuiPaper-root": {
										p: 0,
									},
								}}
							>
								<AccordionSummary
									sx={{
										p: "0 0px",
										width: "100%",
									}}
									expandIcon={
										<span
											className="material-icons"
											style={{
												color: "black",
											}}
										>
											expand_more
										</span>
									}
								>
									<Stack
										direction={"row"}
										alignItems={"center"}
										gap="10px"
										p={"0 0px 10px 0"}
									>
										{/* <Avatar alt={user.name}></Avatar> */}
										{user.name}
									</Stack>
								</AccordionSummary>
								<AccordionDetails
									sx={{
										"& ul": {
											listStyle: "none",
											p: "0",
										},
										"& ul li": {
											padding: "10px 30px",
											transition: "0.25s all",
											fontWeight: "bold",
											fontSize: "20px",
											borderRadius: "5px",
											color: "black",
											// fontSize: '15px',
											"&:hover": {
												// bgcolor: "black",
												color: "red",
											},
											"&.active": {
												color: "var(--red)",
											},
										},
										"& ul li  a": {
											// padding: "10px 30px",
											transition: "0.25s all",
											fontWeight: "bold",
											fontSize: "20px",
											borderRadius: "5px",
											color: "black",
											// fontSize: '15px',
											"&:hover": {
												// bgcolor: "black",
												color: "red",
											},
											"&.active": {
												color: "var(--red)",
											},
										},
									}}
								>
									<ul>
										<li>
											<NavLink
												to={"/user/"}
												onClick={handleLinkClick}
											>
												Profile
											</NavLink>
										</li>
										{/* <li>Account Settings</li> */}
										<li>
											<NavLink
												to="/user/membership"
												onClick={handleLinkClick}
											>
												Membership
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/user/bookings"
												onClick={handleLinkClick}
											>
												Bookings
											</NavLink>
										</li>
										<li>
											<Button
												variant={"filled"}
												onClick={handleLogout}
												innerText={"Logout"}
												color={"black"}
											></Button>
										</li>
									</ul>
								</AccordionDetails>
							</Accordion>
						</div>
					) : (
						<div className="item">
							<Button
								// size="large"
								variant="filled"
								color="red"
								innerText={"Log in"}
								onClick={handleAuthOpen}
							></Button>
							{/* <ComingSoonDialog open={dialogOpen}></ComingSoonDialog> */}
						</div>
					)}
				</div>
			</Drawer>
			{user && (
				<UserMenu
					user={user}
					logout={handleLogout}
					anchorEl={anchorEl}
					handleMenuClose={handleMenuClose}
				></UserMenu>
			)}
		</>
	);
};

export default Navbar;
