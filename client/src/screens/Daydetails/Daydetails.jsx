import { React, useState } from "react";
import "./Daydetails.css";

import Eventcard from "../../components/Eventcard/Eventcard";
import PujaHeading from "../../components/PujaHeading/PujaHeading";
import { useParams } from "react-router-dom";

import Daycontent from "../../assets/data/contents.json"
import Eventcontent from "../../assets/data/events.json"

const Artist = ({ artistName }) => {
  return (
    <div className="artist-banner">
      <img src={`/assets/imgs/artists/${artistName}.png`} />
      <p className="artist-label">{artistName}</p>
    </div>
  );
};

const Daydetails = () => {
  const { DayID } = useParams();
  const Day = Daycontent[DayID];

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
      <div
        className="behind-banner"
        style={{
          background: `url("/assets/imgs/Schedule/${DayID.toLowerCase()}.png"`,
        }}
      ></div>
      <div className="tonight-special">{Day.nightType}</div>
      <PujaHeading date={Day.date} datetxt={DayID.toUpperCase()} />
      <div className="section-1">{Day.intro}</div>

      <div className="section-2">
        <div className="section-subhead">Significance</div>
        {Day.significance}
      </div>
      <div className="section-3">
        <div className="hatchline-banner"></div>
        <div className="section-subhead">{DayID.toUpperCase() + " LINE UP!"}</div>
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
          Eventdata={Eventcontent[DayID].eventList}
          FocusEvent={Eventcontent[DayID].majorEvents}
        />
        <div className="event-controller">
          <div className="controller-btn" onClick={() => handleMargin(1)}>
            <span className="material-icons">arrow_back</span>
            PREVIOUS
          </div>
          <div className="controller-btn" onClick={() => handleMargin(0)}>
            NEXT
            <span className="material-icons">arrow_forward</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daydetails;
