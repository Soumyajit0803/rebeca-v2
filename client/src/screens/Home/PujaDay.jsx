import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./PujaDay.css";
import Button from '../../components/Button/Button';
const PujaDay = ({title, desc, alt, img}) => {
	return (
		<div className={`puja-day ${alt && "alt"}`}>
			<div className="img">
				<img src={img} alt="" />
			</div>
			<div className="contents">
				<Link to={`/events/${title.toLowerCase()}`}>
					<div className="title display-font">{title}</div>
				</Link>

				<div className="desc">{desc}</div>
				<Link to={`/events/${title.toLowerCase()}`}>
					<Button
						variant={"filled"}
						innerText={"Learn More"}
					></Button>
				</Link>
			</div>
		</div>
	);
}
 
export default PujaDay;