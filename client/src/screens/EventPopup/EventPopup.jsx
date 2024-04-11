import React, { useState } from "react";
import Button from "../../components/Button/Button";
import "./EventPopup.css";
import events from "../../../src/assets/data/events.json";
import { useParams } from "react-router-dom";

const EventPopup = () => {
    const { eventName } = useParams();
    const [eventInfo, setEventInfo] = useState(null);
    function findTheDay() {
        for (let d in events) {
            let i = 0;
            for (let eventinfo of events[d]["eventList"]) {
                if (eventinfo.eventName === eventName) {
                    setEventInfo(events[d].eventList[i]);
                    return;
                }
                i += 1;
            }
        }
        console.log("did not find anything\n" + eventName);
    }
    if (events && !eventInfo) findTheDay();

    return (
        events &&
        eventInfo && (
            <div className={"event-popup"}>
                <div className="event-head">{eventName}</div>
                <div className="event-desc-img">
                    <div className="event-poster">
                        <img
                            src={`/assets/imgs/events/posters/${eventName.toLowerCase().replaceAll(" ", "_")}.png`}
                            alt={eventName}
                            srcSet=""
                        />
                    </div>
                    {eventInfo.desc && <div className="event-desc">{eventInfo.desc}</div>}
                </div>
                <div className="event-details">
                    {eventInfo.club && <div className="event-club">{eventInfo.club}</div>}
                    <div className="event-time">{eventInfo.time}</div>
                    <div className="event-venue">{eventInfo.venue}</div>
                </div>
                <Button
                    innerText={"RSVP NOW"}
                    id={""}
                    className={""}
                    variant={""}
                    onClick={() => {}}
                    disabled={""}
                    color={""}
                    size={""}
                    startIcon={""}
                    endIcon={""}
                    loading={""}
                    type={""}
                />
                <div className="event-head event-customhead">Rules</div>
                {eventInfo.rules.length ? (
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
                ) : (
                    <div className="rules-link">
                        <a href={eventInfo.rulesLink}>
                            Open list of rules<div className="material-icons">open_in_new</div>
                        </a>
                    </div>
                )}
                <div className="event-head event-customhead">Judges</div>
                <div className="judges">
                    {eventInfo.judges &&
                        eventInfo.judges.map((judge, i) => {
                            return (
                                <div className="judge" key={i}>
                                    <div className="circle"></div>
                                    <img
                                        src={`/assets/imgs/ProfileImg/${judge}.webp`}
                                        alt="judge"
                                        srcSet=""
                                        className="judge-pic"
                                    />
                                    <span>{judge}</span>
                                </div>
                            );
                        })}
                </div>
                {eventInfo.coordinators ? <div className="event-head event-customhead">Coordinators</div>:""}
                <div className="judges">
                    {eventInfo.coordinators &&
                        eventInfo.coordinators.map((coord, i) => {
                            return (
                                <div className="judge coordinator" key={i}>
                                    <div className="circle"></div>
                                    <img
                                        src={`/assets/imgs/ProfileImg/${coord.name}.webp`}
                                        alt=""
                                        srcSet=""
                                        className="judge-pic"
                                    />
                                    <span className="c-name">{coord.name}</span>
                                    <span className="phone">{coord.num}</span>
                                </div>
                            );
                        })}
                </div>
            </div>
        )
    );
};

export default EventPopup;
