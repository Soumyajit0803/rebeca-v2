import React from "react";
import "./EventList.css";
import { Link } from "react-router-dom";

const extractTime = (isoString) => {
    const date = new Date(isoString);
    const startTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return startTime;
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
                                to={`/event/${a.slug}`}
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
