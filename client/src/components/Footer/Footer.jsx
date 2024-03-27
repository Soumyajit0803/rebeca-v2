import Button from '../../atoms/Button/Button';
import ComingSoonDialog from '../ComingSoonDialog/ComingSoonDialog';
import './Footer.css';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
const Footer = () => {
	const [openComingSoon, setOpenComingSoon] = useState();

	return (
		<div className="footer">
			<div className="left-col">
				<div className="bg">
					<img src="/assets/logo/logo-1024x1024.png" alt="" />
				</div>
				<div className="title">Good Times Vacation</div>
				<div className="text">
					support@goodtimesvacation.com
					<br />
					1800 309 4811 (toll free)
				</div>
				{/* <Button variant="filled" color={"black"} innerText={"Subscribe to our Newsletter"}></Button> */}
			</div>
			<div className="right-col">
				<div className="links">
					<div className="heading">Resorts</div>
					<NavLink to="/resorts">
						<div className="link">Search Resorts</div>
					</NavLink>
					{/* <div className="link">My Resorts</div> */}
					{/* <div className="link">Submit Feedback</div> */}
					<div className="link"></div>
					{/* <div className="link">Travel Alerts</div> */}
					{/* <div className="link">Admin Login</div> */}
				</div>
				<div className="links">
					<div className="heading">Membership</div>
					{/* <div className="link">Get Membership</div> */}
					<NavLink to="/membership">
						<div className="link">Get membership</div>
					</NavLink>
					{/* <div className="link">My Membership</div> */}
					{/* <div className="link">Extend Membership</div> */}
				</div>
				<div className="links">
					<div className="heading">Contact</div>
					<NavLink to="/contact">
						<div className="link">Get in touch</div>
					</NavLink>
					<NavLink to="/faq">
						<div className="link">FAQs</div>
					</NavLink>

					{/* <div className="link">Reviews</div> */}
					{/* <div className="link">x Live Chat</div> */}
				</div>
				<div className="links">
					<div className="heading">Others</div>
					{/* <div className="link">Get Membership</div> */}

					<div
						className="link"
						onClick={() => setOpenComingSoon(true)}
					>
						Career
					</div>

					<div
						className="link"
						onClick={() => setOpenComingSoon(true)}
					>
						Concierge Services
					</div>

					<NavLink className="link" to="/docs/terms-and-conditions">
						<div className="link">Terms and Conditions</div>
					</NavLink>
					<NavLink className="link" to="/docs/privacy-policy">
						<div className="link">Privacy Policy</div>
					</NavLink>
					{/* <div className="link">My Membership</div> */}
					{/* <div className="link">Extend Membership</div> */}
				</div>
				<ComingSoonDialog
					open={openComingSoon}
					onClose={() => setOpenComingSoon(false)}
				></ComingSoonDialog>
			</div>
			<div className="bottom">
				<div className="left-col">
					<div className="cc">© 2023 by Good Times Vacation</div>
					<div className="credits">
						<div className="item">
							Designed by lumierestudios.in
						</div>
						<a href="https://lightstudio.dev" className="item">
							Developed by lightstudio.dev
						</a>
					</div>
				</div>
				<div className="right-col">
					<a href="https://instagram.com/goodtimesvacation?igshid=OGQ5ZDc2ODk2ZA==">
						<i className="fa-brands fa-facebook"></i>
					</a>
					<a href="https://www.facebook.com/profile.php?id=61550711803217&mibextid=ZbWKwL">
						<i className="fa-brands fa-instagram"></i>
					</a>
				</div>
			</div>
		</div>
	);
}
 
export default Footer;