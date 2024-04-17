import { React, useState, useEffect } from "react";
import "./Eventcard.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const Eventpanel = ({ value, index, day, show, handle }) => {
  return (
    <div key={index} className={`event-data ${show && "expand"}`}>
      <div onClick={() => handle(index)} className="data-header">
        <div>{value.eventName}</div>
        <p>{value.time}</p>
      </div>

      <div className="data-body">
        <div className="img">
          <img src={value.img ? value.img : `/assets/imgs/home/${day.toLowerCase()}.webp`} alt="event-icon" />
        </div>
        {show && (
          <>
            <div
              className="desc"
              dangerouslySetInnerHTML={{
                __html: value.desc,
              }}
            ></div>
            <Link to={value.url ? value.url : `/event/` + value.eventName}>
              <Button variant={"filled"} innerText={"Learn more"}></Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const Eventcard = ({ Eventdata, Eventday }) => {
  const [expand, setexpand] = useState(0);
  const handleExpand = (idx) => {
    setexpand(idx);
  };

  return (
    <div className="section-event">
      <div className="event-card">
        {Eventdata.map((value, index) => (
          <Eventpanel
            key={index}
            value={value}
            day={Eventday}
            index={index}
            show={expand === index}
            handle={handleExpand}
          />
        ))}
      </div>
    </div>
  );
};

export default Eventcard;
