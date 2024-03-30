import { React, useState } from "react";
import "./Daydetails.css";

import Eventcard from "../../components/Eventcard/Eventcard";

import Rebeca from "../../../public/assets/eventDetails.json";
import PujaHeading from "../../components/PujaHeading/PujaHeading";

const Artist = ({ artistName }) => {
  return (
    <div className="artist-banner">
      <img src={`/assets/imgs/artists/${artistName}.png`} />
      <p className="artist-label">{artistName}</p>
    </div>
  );
};

const Daydetails = () => {
  const Day = Rebeca.saptami;

  const [controlMargin, setControlMargin] = useState(0);
  const handleMargin = (direction) => {
    if (direction === 1) {
      if (controlMargin === 0) return;

      setControlMargin(controlMargin + 10);
    } else {
      if (controlMargin <= -100) return;
      setControlMargin(controlMargin - 10);
    }
  };
  return (
    <div className="day-details-wrapper">
      <div className="behind-banner"></div>
      {/* <div className="section-head">
        <div className="full-date">
          <div>{Day.date}</div>
          <p>April</p>
        </div>
        <div className="day-nickname">{"Saptami"}</div>
      </div> */}
      <PujaHeading date={20} datetxt={"SAPTAMI"} />
      <div className="section-1">{Day.intro}</div>

      <div className="section-2">
        <div className="section-subhead">Significance</div>
        {Day.significance}
      </div>
      <div className="section-3">
        <div className="hatchline-banner"></div>
        <div className="section-subhead">SAPTAMI LINE UP</div>
        Brace Yourself for an Unforgettable Showcase, As We Proudly Unveil Our Stellar Lineup
      </div>
      <div className="section-4">

        {Day.lineUps.map((value, index) => {
          return <Artist artistName={value} key={index} />;
        })}
      </div>

      <div className="section-5">
        <div className="section-subhead">Events</div>
      </div>
      <div className="section-event">
        <Eventcard
          controlProp={{
            marginLeft: `${controlMargin}rem`,
          }}
          Eventdata = {Day.eventList}
          FocusEvent = {Day.majorEvents}
        />
        <div className="event-controller">
          <div className="controller-btn material-icons" onClick={() => handleMargin(1)}>
            arrow_back
          </div>
          <div className="controller-btn material-icons" onClick={() => handleMargin(0)}>
            arrow_forward
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daydetails;
