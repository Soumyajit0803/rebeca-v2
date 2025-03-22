import React, { useState } from "react";
import "./Schedule.css";
import Heading from "../../components/Heading/Heading";
import PujaHeading from "../../components/PujaHeading/PujaHeading";
import contents from "../../assets/data/contents.json";
import events from "../../assets/data/events.json";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import EventList from "../../components/EventList/EventList";
import Eventcard from "../../components/Eventcard/Eventcard";
import { getAllEvents } from "../../services/eventApi";
import { useEffect } from "react";
import { useAuth } from "../../AuthContext";
import {nights} from "../../App"

var introtext = `Experience the timeless tradition of REBECA! Join us for an unforgettable celebration filled with music, dance, competitions, and workshops. Embrace the vibrant spirit of our community as we come together to create lasting memories and forge new friendships. From electrifying performances to engaging activities, there's something for everyone to enjoy. Don't miss out on this exciting event that honors our college's rich heritage and brings us closer together.`;

function EventSection({ date, datetxt, eventlist, topic, about }) {
    var bgsetter = datetxt.toLowerCase();
    const { innerWidth: width, innerHeight: height } = window;

    return (
        <div className={"event " + bgsetter + "-back"}>
            <Link to={`/events/${bgsetter}`}>
                <PujaHeading date={date} datetxt={datetxt} customcss={"left-padding"} />
            </Link>
            <div className={"event-content"}>
                {width > 580 ? (
                    <EventList eventlist={eventlist} />
                ) : (
                    <Eventcard Eventdata={eventlist} Eventday={datetxt} />
                )}
                <div className="description">
                    <div className="topic display-font">{topic}</div>
                    <div className="about">{about}</div>

                    <Link to={`/events/${bgsetter}`}>
                        <Button variant={"filled"} innerText={"Learn more"}></Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const onButtonClick = () => {
    const pdfUrl = "/assets/Rebeca83Rulebook.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "rebecaRuleBook.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

function Schedule() {
    const { allEvents } = useAuth();
    const [loading, setLoading] = useState(false);
    console.log(allEvents);

    const { innerWidth: width, innerHeight: height } = window;

    return (
        contents &&
        events && (
            <div className="schedule">
                <Heading title={"REBECA SCHEDULE"} subTitle={introtext} />
                <Link to={"#"}>
                    <Button
                        className="download_btn"
                        variant={"filled"}
                        innerText={"Download the Rulebook"}
                        endIcon={<span className="material-icons">file_download</span>}
                        onClick={onButtonClick}
                    ></Button>
                </Link>
                {
                    <div className={"event pre-event"}>
                        {/* <Link to={`/events/${bgsetter}`}>
							{/* <PujaHeading
								date={date}
								datetxt={datetxt}
								customcss={"left-padding"}
							/> */}
                        {/* </Link> */}
                        <div className="eheading">
                            <div className="small">
                                <span></span>
                                <div className="big1">Misc. Events</div>
                            </div>
                        </div>
                        <div className={"event-content"}>
                            {width > 580 ? (
                                <EventList
                                    eventlist={allEvents.filter(
                                        (e) => ![20, 21, 22, 23].includes(new Date(e.rounds[0].startTime).getUTCDate())
                                    )}
                                />
                            ) : (
                                <Eventcard
                                    Eventdata={allEvents.filter(
                                        (e) => ![20, 21, 22, 23].includes(new Date(e.rounds[0].startTime).getUTCDate())
                                    )}
                                    Eventday={"saptami"}
                                />
                            )}
                            <div className="description">
                                {/* <div className="topic display-font">
									Pre Events
								</div> */}
                                <div className="about">
                                    Get ready to dive into the festivities early with our pre-events, featuring
                                    workshops, performances, and interactive activities to ignite your passion for
                                    culture and creativity.
                                </div>

                                {/* <Link to={`/events/${bgsetter}`}>
									<Button
										variant={"filled"}
										innerText={"Learn more"}
									></Button>
								</Link> */}
                            </div>
                        </div>
                    </div>
                }
                {Object.keys(nights).map((night, i) => {
                    return (
                        <EventSection
                            date={nights[night]}
                            datetxt={night.toUpperCase()}
                            eventlist={allEvents.filter(
                                (e) => new Date(e.rounds[0].startTime).getUTCDate() == nights[night]
                            )}
                            topic={contents[night].nightType}
                            about={contents[night].intro}
                            key={i}
                        />
                    );
                })}
            </div>
        )
        // <EventPopup />
    );
}

export default Schedule;