import React, { useState } from "react";
import Button from "../../components/Button/Button";
import "./EventPopup.css";
import events from "../../../src/assets/data/events.json";
import { useParams } from "react-router-dom";

var eventName = "Kolkata Night";
var desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget dignissim velit rhoncus ut. Quisque efficitur velit ac euismod cursus. Curabitur at erat eu mi gravida scelerisque. Aenean quis interdum nibh.`;
var rules = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
];

var judges = ["person", "person", "person", "person"];

const EventPopup = () => {
    const {eventName} = useParams();
    var [eventInfo, setEventInfo] = useState(null);
    function findTheDay() {
        for (let d in events) {
            let i = 0;
            for (let eventinfo of events[d]["eventList"]) {
                if (eventinfo.eventName === eventName) {
                    // setDay(d); setI(i)
                    setEventInfo(events[d].eventList[i])
                    return;
                }
                i += 1;
            }
        }
        console.log("did not find anything\n"+eventName);;
    }
    if (events && !eventInfo) findTheDay();

    return (
        events && eventInfo && (
            <div className={"event-popup " + eventName + "-event-popup"}>
                <div className="event-head">{eventName}</div>
                <div className="event-desc">{eventInfo.desc}</div>
                <div className="event-details">
                    <div className="event-time">{eventInfo.time}</div>
                    <div className="event-venue">{eventInfo.venue}</div>
                </div>
                <Button innerText={"RSVP NOW"} id={""} className={""} variant={""} onClick={()=>{}} disabled={""} color={""} size={""} startIcon={""} endIcon={""} loading={""} type={""}/>
                <div className="event-head event-customhead">
                    Rules
                </div>
                <div className="rules-list-contain">
                    <ul className="rules-list">
                        {eventInfo.rules.map((rule, i) => {
                            return (
                                <li key={i} className="rule-item">
                                    {rule}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="event-head event-customhead">
                    Judges
                </div>
                <div className="judges">
                    {eventInfo.judges.map((judge, i) => {
                        return (
                            <div className="judge" key={i}>
                                <img
                                    src={`/assets/imgs/ProfileImg/${judge}.png`}
                                    alt=""
                                    srcSet=""
                                    className="judge-pic"
                                />
                                <span>{judge}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    );
};

function Check() {
    return (
        <EventPopup
            // eventName={"ashtami-Inauguration5"}
        />
    );
}

export default EventPopup;
