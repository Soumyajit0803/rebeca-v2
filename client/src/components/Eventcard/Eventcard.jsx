import {React, useState} from "react";
import "./Eventcard.css"

const Eventcard = ({ controlProp, Eventdata, FocusEvent }) => {
  const [expand, setexpand] = useState(0);
  const handleExpand = (idx) => {
    if(expand===idx)setexpand(null);
    else setexpand(idx);
  };

  return (
    <div style = {controlProp} className="event-card">
      {Eventdata.map((value, index) => {
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
            <div className="data-body">
              <img
                style={{
                  width: show ? "22rem" : "0",
                }}
                src={`/assets/imgs/home/${value.eventName}.png`}
                alt=""
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Eventcard;
