import { React, useState } from "react";
import "./Daydetails.css";

import Eventcard from "../../components/Eventcard/Eventcard";
import PujaHeading from "../../components/PujaHeading/PujaHeading";
import { useParams } from "react-router-dom";
import ArtistCard from "../../components/ArtistCard/ArtistCard";

import Daycontent from "../../assets/data/contents.json";
import Eventcontent from "../../assets/data/events.json";
import { useAuth } from "../../AuthContext";
import { extractTime } from "../../components/EventList/EventList";
import { nights } from "../../App";
import { Box, Paper, Typography } from "@mui/material";

const Daydetails = () => {
    const { DayID } = useParams();
    const Day = Daycontent[DayID];

    const { allEvents } = useAuth();
    const filteredEvents =
        allEvents && allEvents.filter((e) => new Date(e.rounds[0].startTime).getUTCDate() == nights[DayID]);

    console.log(allEvents);

    return (
        <div className="day-details-wrapper">
            <div
                className="behind-banner"
                style={{
                    background: `url("/assets/imgs/Schedule/${DayID.toLowerCase()}.webp"`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
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
                <div className="section-subhead">{DayID.toUpperCase() + " LINE UP!"}</div>
                {/* Brace Yourself for an Unforgettable Showcase, As We Proudly */}
            </div>
            <div className="section-4">
                {Day.lineUps.map((value, index) => {
                    return <ArtistCard key={index} name={value.name} img={value.img}></ArtistCard>;
                })}
                {/* <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <img src="/assets/imgs/artists/comingsoon.webp" style={{width: "10rem"}} />
                    <Typography variant="h5" fontFamily={"Sedgwick Ave Display"}>Coming soon!</Typography>
                </Box> */}
            </div>

            <div className="section-5">
                <div className="section-subhead">Events</div>
            </div>
            {/* <div className="section-event"> */}
            <Eventcard Eventdata={filteredEvents} Eventday={DayID.toLowerCase()} />
            {/* </div> */}
        </div>
    );
};

export default Daydetails;
