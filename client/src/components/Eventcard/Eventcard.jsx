import {React, useState} from "react";
import "./Eventcard.css"

const Eventcard = ({ controlProp }) => {
  const [expand, setexpand] = useState(0);
  const handleExpand = (idx) => {
    if(expand===idx)setexpand(null);
    else setexpand(idx);
  };

  const allEvents = [
    {
      eventname: "SATURNALIA",
      eventimage: "ashtami",
    },
    {
      eventname: "SATURNALIA",
      eventimage: "ashtami",
    },
    {
      eventname: "SATURNALIA",
      eventimage: "ashtami",
    },
    {
      eventname: "SATURNALIA",
      eventimage: "ashtami",
    },
    {
      eventname: "SATURNALIA",
      eventimage: "ashtami",
    },
    {
      eventname: "SATURNALIA",
      eventimage: "ashtami",
    },
    {
      eventname: "SATURNALIA",
      eventimage: "ashtami",
    },
  ];

  const majorEvents = [0, 3, 6];

  return (
    <div style = {controlProp} className="event-card">
      {allEvents.map((value, index) => {
        var show = expand === index ? true : false;
        if (majorEvents.includes(index)) {
          show = true;
        }
        return (
          <div key={index} className="event-data">
            <div onClick={() => handleExpand(index)} className="data-header">
              {value.eventname}
              <p>11:30</p>
            </div>
            <div className="data-body">
              <img
                style={{
                  width: show ? "22rem" : "0",
                }}
                src={`/assets/imgs/home/${value.eventimage}.png`}
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
