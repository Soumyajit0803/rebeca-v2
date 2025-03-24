import React, { useState, useEffect } from "react";
import "./Heading.css";

const Heading = ({ title, subTitle, needHatch = true }) => {
	return (
		<div className="heading">
			{needHatch && <div className="bg">
				<img src="/assets/imgs/hatch_lines.webp" alt="" />
			</div>}
			<div className="title display-font">{title}</div>
			{subTitle && <div className="sub-title">{subTitle}</div>}
		</div>
	);
};

export default Heading;
