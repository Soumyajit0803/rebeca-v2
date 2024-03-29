import React, { useState, useEffect } from 'react';
import "./PujaDay.css";
const PujaDay = ({title, desc, alt, img}) => {
	return (
		<div className={`puja-day ${alt && 'alt'}`}>
			<div className="img">
				<img src={img} alt="" />
			</div>
			<div className="contents">
				<div className="title display-font">{title}</div>
				<div className="desc">{ desc}</div>
			</div>
		</div>
	);
}
 
export default PujaDay;