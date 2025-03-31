import React from "react";
import "./EventList.css";
import { Link } from "react-router-dom";

export const extractTime = (isoString) => {
    const date = new Date(isoString);
    const startTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return startTime;
};

export const extractFullDate = (isoString, removeYear=false) => {
    const date = new Date(isoString);
    
    // Format date
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const year = date.getFullYear();
    
    // Format time
    const startTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    // Determine ordinal suffix for day (e.g., 12th, 21st, etc.)
    let ordinalSuffix = "th";
    if (day % 10 === 1 && day !== 11) {
        ordinalSuffix = "st";
    } else if (day % 10 === 2 && day !== 12) {
        ordinalSuffix = "nd";
    } else if (day % 10 === 3 && day !== 13) {
        ordinalSuffix = "rd";
    }

    // Construct formatted string
    const formattedTime = `${day}${ordinalSuffix} ${month}${removeYear?"":" "+year}, ${startTime}`;

    return formattedTime;
};


const EventList = ({ eventlist }) => {
    return (
        <div className="list">
            <div className="timings">
                {eventlist.map((a, i) => {
                    return (
                        <div className="row" key={i}>
                            <div className="time">{a && a.rounds && extractTime(a.rounds[0]?.startTime)}</div>
                            <div className="linespace"></div>
                            <Link
                                to={`/events/${a.slug}`}
                            >
                                <div className="eventname">
                                    {a.eventName}
                                    <div className="material-icons">open_in_new</div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EventList;
