import React, { useState } from "react";
import Button from "../../components/Button/Button";
import "./EventPopup.css";
import events from "../../../src/assets/data/events.json";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { Alert } from "@mui/material";

function register(url) {
    window.open(url ? url : "#", "_blank");
}

const EventPopup = () => {
    const { eventName } = useParams();
    const [eventInfo, setEventInfo] = useState(null);
    const navigate = useNavigate();
    const {user} = useAuth()
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
                            src={`/assets/imgs/events/posters/${eventName.toLowerCase().replaceAll(" ", "_")}.webp`}
                            alt={eventName}
                            srcSet=""
                        />
                    </div>
                    <div className="event-desc">
                        {eventInfo.desc && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: eventInfo.desc,
                                }}
                            ></div>
                        )}

                        <Button
                            disabled = {!user?.college}
                            innerText={"REGISTER"}
                            onClick={() => navigate(`/events/${eventName}/register`, { state: {mode: "single", fee: 0} })}
                        />
                        {!user?.college && <Alert severity="warning" >Complete your profile before proceeding to register for events.</Alert>}
                        <>
                            {eventInfo.registrationFee && (
                                <p className="fee">(Registration Fee - {eventInfo.registrationFee})</p>
                            )}
                        </>
                    </div>
                </div>
                <div className="event-details">
                    {eventInfo.club && <div className="event-club">{eventInfo.club}</div>}
                    {eventInfo.time && <div className="event-time">{eventInfo.time}</div>}
                    {eventInfo.venue && <div className="event-venue">{eventInfo.venue}</div>}
                </div>

                {(eventInfo.rules || eventInfo.rulesLink) && (
                    <>
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
                                    Open list of rules
                                    <div className="material-icons">open_in_new</div>
                                </a>
                            </div>
                        )}
                    </>
                )}
                {eventInfo.judges && (
                    <>
                        <div className="event-head event-customhead">Judges</div>
                        <div className="judges">
                            {eventInfo.judges.map((judge, i) => {
                                return (
                                    <div className="judge" key={i}>
                                        {/* <img
											src={`/assets/imgs/team/${judge}.webp`}
											alt="judge"
											srcSet=""
											className="judge-pic"
										/> */}
                                        <div className="img">
                                            <img src="/assets/imgs/circle.png" alt="" className="circle" />
                                            <div className="dp2">
                                                <img src="/assets/imgs/team/dp2.webp" alt="" />
                                            </div>
                                            <div className="dp">
                                                <img
                                                    src={`/assets/imgs/team/${judge}.webp`}
                                                    alt=""
                                                    className="judge-pic"
                                                ></img>
                                            </div>
                                        </div>
                                        <span>{judge}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {eventInfo.coordinators ? <div className="event-head event-customhead">Coordinators</div> : ""}
                <div className="judges">
                    {eventInfo.coordinators &&
                        eventInfo.coordinators.map((coord, i) => {
                            return (
                                <div className="judge coordinator" key={i}>
                                    <div className="img">
                                        <img src="/assets/imgs/circle.png" alt="" className="circle" />
                                        <div className="dp2">
                                            <img src="/assets/imgs/team/dp2.webp" alt="" />
                                        </div>
                                        <div className="dp">
                                            <img
                                                src={`/assets/imgs/team/${coord.name
                                                    .toLowerCase()
                                                    .replaceAll(" ", "")}.webp`}
                                                alt=""
                                            ></img>
                                        </div>
                                    </div>
                                    <span className="c-name">{coord.name}</span>
                                    <div className="phone">
                                        <span className="material-icons">person</span>
                                        {coord.num}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        )
    );
};

export default EventPopup;
