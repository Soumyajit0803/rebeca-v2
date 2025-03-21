import React from "react";
import "./EventList.css";
import { Link } from "react-router-dom";

const EventList = ({ eventlist }) => {
    return (
        <div className="list">
            <div className="timings">
                {eventlist.map((a, i) => {
                    return (
                        <div className="row" key={i}>
                            <div className="time">{a.time}</div>
                            <div className="linespace"></div>
                            <Link
                                to={{
                                    pathname: a.url ? a.url : `/event/${a.eventName}`,
                                    state: { data: "JSON.stringify(a)" },
                                }}
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
