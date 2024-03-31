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
                            <div className="time">{a[0]}</div>
                            <div className="linespace"></div>
                            <Link to={`/event/${a[1]}`}>
                                <div className="eventname">
                                    {a[1]}
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
