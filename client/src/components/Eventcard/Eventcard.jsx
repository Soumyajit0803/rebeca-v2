import { React, useState } from "react";
import "./Eventcard.css";
import { Link } from "react-router-dom";

const Eventpanel = ({ value, index, FocusEvent }) => {
  const [expand, setexpand] = useState(0);
  const handleExpand = (idx) => {
    if (expand === idx) setexpand(null);
    else setexpand(idx);
  };
  var show = expand === index ? true : false;
  if (FocusEvent.includes(index)) {
    show = true;
  }
  return (
    <div key={index} className="event-data">
      <div onClick={() => handleExpand(index)} className="data-header">
        {value.eventName}
        <p>{value.time}</p>
      </div>
      <Link to={`/eventdata/${value.eventName}`}>
        <div className="data-body">
          <img
            style={{
              width: show ? "22rem" : "0",
            }}
            src={`/assets/imgs/home/${value.eventName}.png`}
            alt=""
          />
        </div>
      </Link>
    </div>
  );
};

const Eventcard = ({ Eventdata, FocusEvent }) => {
  return (
    <div className="event-card">
      {Eventdata.map((value, index) => (
        <Eventpanel key={index} value={value} index={index} FocusEvent={FocusEvent} />
      ))}
    </div>
  );
};

export default Eventcard;
