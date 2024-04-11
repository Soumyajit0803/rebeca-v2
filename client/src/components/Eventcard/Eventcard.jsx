import { React, useState, useEffect } from "react";
import "./Eventcard.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const Eventpanel = ({ value, index, day, FocusEvent }) => {
	const [expand, setexpand] = useState(0);
	const handleExpand = (idx) => {
		if (expand === idx) setexpand(null);
		else setexpand(idx);
	};
	var show = expand === index ? true : false;
	if (FocusEvent.includes(index)) {
		show = true;
	}

	const propsHeight = { height: show ? "15rem" : "0px" };
	const propsWidth = { width: show ? "22rem" : "0px" };
	const propsImgHeight = { transform: show ? "scaleY(1)" : "scaleY(0)" };
	const propsImgWidth = { transform: show ? "scaleX(1)" : "scaleX(0)" };

	return (
		<div key={index} className={`event-data ${show && "expand"}`}>
			<div onClick={() => handleExpand(index)} className="data-header">
				<div>{value.eventName}</div>
				<p>{value.time}</p>
			</div>

			<div className="data-body">
				<div className="img">
					<img
						src={`/assets/imgs/home/${day}.webp`}
						alt="event-icon"
					/>
				</div>
				{show && (
					<>
						<div className="desc">{value.desc}</div>
						<Link to={`/event/${value.eventName}`}>
							<Button
								variant={"filled"}
								innerText={"Learn more"}
							></Button>
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

const Eventcard = ({ Eventdata, FocusEvent, Eventday }) => {
	return (
		<div className="event-card">
			{Eventdata.map((value, index) => (
				<Eventpanel
					key={index}
					value={value}
					day={Eventday}
					index={index}
					FocusEvent={FocusEvent}
				/>
			))}
		</div>
	);
};

export default Eventcard;
