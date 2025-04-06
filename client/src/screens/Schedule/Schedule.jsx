import React, { useState, useEffect } from "react";
import "./Schedule.css";
import { useAuth } from "../../AuthContext";
import Heading from "../../components/Heading/Heading";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { nights } from "../../App";
import { extractTime } from "../../components/EventList/EventList";
import { Tooltip, Paper } from "@mui/material";

var introtext = `Plan Your Moves, Catch Every Moment!
Get ready to dive into the heart of REBECA 84! From electrifying performances to unmissable events, here's your roadmap to the ultimate celebration. Mark your calendars, set your reminders, and brace yourself for an unforgettable journey. From sunup to sundown, here's where the magic unfolds—don't blink or you might miss it!`;

const content = {
    miscellaneous: {
        name: "Pre-Events",
        image: "/assets/imgs/Schedule/preevents.webp",
        intro: "Kickstart the celebrations with our electrifying pre-events! Experience thrilling workshops, captivating performances, and hands-on activities designed to spark your passion for culture and creativity. Don't just wait for the main event—immerse yourself in the excitement from the very start!",
    },
    saptami: {
        name: "Saptami Symphony",
        image: "/assets/imgs/Schedule/saptami.webp",
        intro: "Immerse yourself in the vibrant essence of Indian culture as gifted artists from across the nation come together to create a mesmerizing tapestry of grace and tradition. Let the melodies of celebration fill the air, marking the grand beginning of our beloved Pujo!",
    },
    ashtami: {
        name: "Ashtami Aura",
        image: "/assets/imgs/Schedule/ashtami.webp",
        intro: "As the evening unfolds, the BEings will set the stage ablaze with electrifying performances, lighting up the night with their unmatched talent and creativity. Get ready to cheer your hearts out for your best friends as they command the spotlight, turning the stage into a spectacle of passion and brilliance. Let's make this night a celebration of the incredible talent that unites us all!",
    },
    navami: {
        name: "Navami Nirvana",
        image: "/assets/imgs/Schedule/navami.webp",
        intro: "Beneath the starlit sky, let Kolkata's soul-stirring symphony sweep you away. Come, cheer, and revel as the legends of our beloved city set the stage on fire, crafting an evening of musical euphoria that knows no boundaries—uniting us all in the heartbeat of Navami's enchanting rhythm!",
    },
    dashami: {
        name: "Dashami Dazzle",
        image: "/assets/imgs/Schedule/dashami.webp",
        intro: "Put on your dancing shoes and get ready to lose yourself in the electrifying beats of Bollywood! Feel the infectious energy take over as you dance like nobody's watching, screaming with joy and celebrating the grand finale of our festival. Let this unforgettable night fill your heart with memories that will stay with you long after the stars fade into dawn!",
    },
};

const PosterImage = ({ src }) => {
    return (
        <Paper elevation={3} sx={{ width: 200, height: 200 }}>
            <img src={src} alt={src} style={{ width: "100%", height: "100%" }} />
        </Paper>
    );
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
                    backgroundSize: "contain",
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
                                fontWeight: "300",
                                lineHeight: "1.2em",
                                textAlign: mobileView ? "center" : "left",
                            }}
                            className="data-intro"
                        >
                            {data.intro}
                            {rank !== 0 && (
                                <Link to={`/events/day/${data.name.split(" ")[0].toLowerCase()}`}>
                                    <Button innerText={"Know more"} />
                                </Link>
                            )}
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
                                    <Link
                                        to={`/events/${ev?.slug}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <Tooltip title={<PosterImage src={ev?.poster} />} placement="bottom-end" arrow>
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
                                                    backdropFilter: "blur(10px)",
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
                                        </Tooltip>
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
                                fontWeight: "300",
                                lineHeight: "1.2em",
                            }}
                            className="data-intro"
                        >
                            {data.intro}
                            {rank !== 0 && (
                                <Link to={`/events/day/${data.name.split(" ")[0].toLowerCase()}`}>
                                    <Button innerText={"Know more"} />
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    );
}

const onButtonClick = () => {
    const pdfUrl = "/assets/Rebeca84Rulebook.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Rebeca84RuleBook.pdf"; // specify the filename
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
                    <img src="/assets/imgs/Schedule/eventBanner.webp" alt="" />
                </div>
                <Heading title={"REBECA SCHEDULE"} subTitle={introtext} needHatch={false} />
                <Link to={"#"}>
                    <Button
                        className="download_btn"
                        variant={"filled"}
                        innerText={"Download full Rulebook"}
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
