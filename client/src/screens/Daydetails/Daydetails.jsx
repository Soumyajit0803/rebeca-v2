import { React, useState } from "react";
import "./Daydetails.css";

import Eventcard from "../../components/Eventcard/Eventcard";
import PujaHeading from "../../components/PujaHeading/PujaHeading";
import { useParams } from "react-router-dom";
import ArtistCard from "../../components/ArtistCard/ArtistCard";

import Daycontent from "../../assets/data/contents.json";
import Eventcontent from "../../assets/data/events.json";

const Artist = ({ artistName }) => {
  return (
		<div className="artist-banner">
			<div className="img">
				<img src={`/assets/imgs/artists/${artistName}.png`} />
			</div>

			<p className="artist-label">{artistName}</p>
		</div>
  );
};

const Daydetails = () => {
  const { DayID } = useParams();
  const Day = Daycontent[DayID];

  return (
    <div className="day-details">
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
        {/* <div className="hatchline-banner"></div> */}
        <div className="section-subhead">{DayID.toUpperCase() + " LINE UP!"}</div>
        Brace Yourself for an Unforgettable Showcase, As We Proudly Unveil Our Stellar Lineup
      </div>
      <div className="section-4">
        {Day.lineUps.map((value, index) => {
          return (
				<ArtistCard
					key={index}
					name={value}
					img={`${value}.png`}
				></ArtistCard>
			);
        })}
      </div>

      <div className="section-5">
        <div className="section-subhead">Events</div>
      </div>
      <div className="section-event">
        <div className="scroll-section-event">
          <Eventcard
            Eventdata={Eventcontent[DayID].eventList}
            FocusEvent={Eventcontent[DayID].majorEvents}
          />
        </div>
        
      </div>
    </div>
  );
};

export default Daydetails;
