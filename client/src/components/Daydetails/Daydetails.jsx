import { React, useState } from "react";
import "./Daydetails.css";

import Eventcard from "../Eventcard/Eventcard";

const Artist = ({ artistName }) => {
  return (
    <div className="artist-banner">
      <img src={`/assets/imgs/artists/${artistName}.png`} />
      <p className="artist-label">{artistName}</p>
    </div>
  );
};

const Daydetails = () => {

  const [controlMargin, setControlMargin] = useState(0);
  const handleMargin = (direction) =>{
    
    if(direction===1){
      if(controlMargin===0)return;

      setControlMargin(controlMargin + 10);
    }
    else{
      if(controlMargin<=-100)return;
      setControlMargin(controlMargin - 10);
    }
  }
  return (
    <div className="day-details-wrapper">
      <div className="behind-banner"></div>
      <div className="section-head">
        <div className="full-date">
          <div>20</div>
          <p>April</p>
        </div>
        <div className="day-nickname">Saptami</div>
      </div>
      <div className="section-1">
        Get ready to soak in the rich heritage of Indian culture as talented artists from all across the nation weave
        together a tapestry of grace and timeless magic, filling the air with the tunes of celebration and marking the
        very beginning of our very own Pujo
      </div>

      <div className="section-2">
        <div className="section-subhead">Significance</div>
        Get ready to soak in the rich heritage of Indian culture as talented artists from all across the nation weave
        together a tapestry of grace and timeless magic, filling the air with the tunes of celebration and marking the
        very beginning of our very own Pujo. filling the air with the tunes of celebration and marking the very
        beginning of our very own Pujo.
      </div>
      <div className="section-3">
        <div className="hatchline-banner"></div>
        <div className="section-subhead">SAPTAMI LINE UP</div>
        Brace Yourself for an Unforgettable Showcase, As We Proudly Unveil Our Stellar Lineup
      </div>
      <div className="section-4">
        <Artist artistName={"artist1"} />
        <Artist artistName={"artist3"} />
        <Artist artistName={"artist2"} />
        <Artist artistName={"artist3"} />
      </div>

      <div className="section-5">
        <div className="section-subhead">Events</div>
      </div>
      <div className="section-event">
        <Eventcard controlProp = {{
          marginLeft: `${controlMargin}rem`
        }} />
        <div className="event-controller">
          <div className="controller-btn material-icons" onClick = {()=>handleMargin(1)}>arrow_back</div>
          <div className="controller-btn material-icons"onClick = {()=>handleMargin(0)}>arrow_forward</div>
        </div>
      </div>
    </div>
  );
};

export default Daydetails;
