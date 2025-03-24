import React, { useState, useEffect } from "react";
import "./Schedule.css";
import events from "../../assets/data/events.json";
import { useAuth } from "../../AuthContext";
import Heading from "../../components/Heading/Heading";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { nights } from "../../App";
import { extractTime } from "../../components/EventList/EventList";

var introtext = `Prepare to be swept away as you put your best foot forward in this epic celebration of creativity and culture tha promises you laughter, joy and memories that will last you a lifetime and more. Keep your water bottles handy and get ready to feel the heat cuz the 83rd edition of REBECA is back with a bang!`;

const content = {
    miscellaneous: {
        name: "Pre-Events",
        image: "/assets/imgs/Schedule/schedule-2.webp",
        intro: "Some lorem text to highlight the main attraction of this day. Nothing much to talk about here",
    },
    saptami: {
        name: "Saptami Symphony",
        image: "/assets/imgs/Schedule/schedule-3.webp",
        intro: "Some lorem text to highlight the main attraction of this day. Nothing much to talk about here",
    },
    ashtami: {
        name: "Ashtami Aura",
        image: "/assets/imgs/Schedule/schedule-2.webp",
        intro: "Some lorem text to highlight the main attraction of this day. Nothing much to talk about here",
    },
    navami: {
        name: "Navami Nirvana",
        image: "/assets/imgs/Schedule/schedule-3.webp",
        intro: "Some lorem text to highlight the main attraction of this day. Nothing much to talk about here",
    },
    dashami: {
        name: "Dashami Dazzle",
        image: "/assets/imgs/Schedule/schedule-2.webp",
        intro: "Some lorem text to highlight the main attraction of this day. Nothing much to talk about here",
    }
};

function EventSection({ data, dayEvents, rank }) {
    const { innerWidth } = window;
    const mobileView = innerWidth <= 970 ? true : false;

    return (
        data && (
            <div
                className="event_div"
                style={{
                    backgroundImage: `url(${data.image})`,
                    backgroundSize: "70%",
                    justifyContent: "space-between",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    padding: "1.5rem",
                    position: "relative",

                    display: "flex",
                    alignItems: mobileView ? "center" : rank & 1 ? "flex-end" : "flex-start",
                    justifyContent: "center",
                    flexDirection: "column",
                    margin: "3.5rem 0",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        marginBottom: "2rem",
                        textAlign: "center",
                        lineHeight: "4em",
                    }}
                >
                    <div className="day-title" data-text={data.name}>
                        {data.name}
                    </div>
                </div>

                <div
                    className="day-section"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "min-content",
                        gap: mobileView ? "2rem" : "4rem",
                    }}
                >
                    {((rank & 1) === 1 || mobileView) && (
                        <div
                            style={{
                                width: "25ch",
                                fontSize: mobileView ? "1rem" : "1.2rem",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: mobileView ? "center" : "flex-start",
                                gap: "1.5rem",
                                fontWeight: "200",
                                lineHeight: "1.2em",
                                textAlign: mobileView ? "center" : "left",
                            }}
                        >
                            {data.intro}
                            {rank!==0 && <Link to={`/events/day/${data.name.split(" ")[0].toLowerCase()}`}>
                                <Button innerText={"Know more"} />
                            </Link>}
                        </div>
                    )}

                    <div
                        className="Outer-div"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "7px",
                        }}
                    >
                        {dayEvents &&
                            dayEvents.map((ev, idx) => {
                                const time = extractTime(ev?.rounds[0].startTime);
                                return (
                                    <Link to={`/events/${ev?.slug}`} style = {{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}>
                                        <div
                                            key={idx}
                                            className="one"
                                            style={{
                                                border: "1px solid rgb(201, 201, 201)",
                                                borderRadius: "5px",
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "0.5rem 1.5rem",
                                                width: "min(35rem, 90vw)",
                                                height: "100%",
                                                justifyContent: "space-between",
                                                background: " rgba(255, 255, 255, 0.06) ",
                                                backdropFilter: "blur(10px)"
                                            }}
                                        >
                                            <div
                                                className="small1"
                                                style={{
                                                    fontWeight: 400,
                                                    fontSize: "1.2rem",
                                                    alignItems: "center",
                                                    width: "15ch",
                                                    wordWrap: "break-word",
                                                }}
                                            >
                                                {ev.eventName}
                                            </div>
                                            {/* <div
                                    className="small1"
                                    style={{
                                        fontWeight: 200,
                                        fontSize: "1rem",
                                        width: "10ch",
                                    }}
                                >
                                    {event.round}
                                </div> */}
                                            <div
                                                className="small1"
                                                style={{
                                                    fontSize: mobileView ? "1rem" : "1.2rem",
                                                    fontWeight: 400,
                                                }}
                                            >
                                                {time}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>

                    {(rank & 1) === 0 && !mobileView && (
                        <div
                            style={{
                                width: "25ch",
                                fontSize: "1.2rem",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                textAlign: "right",
                                gap: "1.5rem",
                                fontWeight: "200",
                                lineHeight: "1.2em",
                            }}
                        >
                            {data.intro}
                            {rank!==0 && <Link to={`/events/day/${data.name.split(" ")[0].toLowerCase()}`}>
                                <Button innerText={"Know more"} />
                            </Link>}
                        </div>
                    )}
                </div>
            </div>
        )
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
    const { allEvents, eventsLoad } = useAuth();
    const [eventContent, setEventContent] = useState({
        saptami: [],
        ashtami: [],
        navami: [],
        dashami: [],
        miscellaneous: [],
    });

    useEffect(() => {
        if (!allEvents) return;

        const updatedContent = {
            saptami: [],
            ashtami: [],
            navami: [],
            dashami: [],
            miscellaneous: [],
        };

        for (let e of allEvents) {
            const date = new Date(e.rounds[0].startTime).getUTCDate();

            if (date === nights.saptami) updatedContent.saptami.push(e);
            else if (date === nights.ashtami) updatedContent.ashtami.push(e);
            else if (date === nights.navami) updatedContent.navami.push(e);
            else if (date === nights.dashami) updatedContent.dashami.push(e);
            else updatedContent.miscellaneous.push(e);
        }

        setEventContent(updatedContent);
    }, [allEvents]);

    return (
        <div className="schedule">
            <div className="heading">
                <div className="event_bg">
                    <img src="/assets/imgs/Schedule/schedule-1.webp" alt="" />
                </div>
                <Heading title={"REBECA SCHEDULE"} subTitle={introtext} needHatch={false} />
                <Link to={"#"}>
                    <Button
                        className="download_btn"
                        variant={"filled"}
                        innerText={"Download the Rulebook"}
                        endIcon={<span className="material-icons">file_download</span>}
                        onClick={onButtonClick}
                    ></Button>
                </Link>
            </div>

            {!eventsLoad &&
                Object.keys(content).map((night, i) => {
                    return <EventSection data={content[night]} key={i} dayEvents={eventContent[night]} rank={i} />;
                })}
        </div>
    );
}

export default Schedule;
