import React, { useState } from "react";
import "./Schedule.css";
import events from "../../assets/data/events.json";
import { useAuth } from "../../AuthContext";
import Heading from "../../components/Heading/Heading";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

var introtext = `Prepare to be swept away as you put your best foot forward in this epic celebration of creativity and culture tha promises you laughter, joy and memories that will last you a lifetime and more. Keep your water bottles handy and get ready to feel the heat cuz the 83rd edition of REBECA is back with a bang!`;

var content = {
    "Saptami Symphony": {
        date: 10,
        name: "Saptami Symphony",
        event_details: [
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
        ],
        image: "/assets/imgs/events/images/saptami_bg.svg",
        intro: "Some lorem text to highlight the main attraction of this day. Nothing much to talk about here",
    },
    "Ashtami Aura": {
        date: 11,
        name: "Ashtami Aura",
        image: "/assets/imgs/events/images/asthami_bg.svg",
        event_details: [
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
        ],
        intro: "Some lorem text to highlight the main attraction of this day. Nothing much to talk about here",
    },
    "Navami Nirvana": {
        date: 12,
        name: "Navami Nirvana",
        image: "/assets/imgs/events/images/saptami_bg.svg",
        event_details: [
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
        ],
        intro: "Some lorem text to highlight the main attraction of this day. Nothing much to talk about here",
    },
    "Dashami Dazzle": {
        date: 13,
        name: "Dashami Dazzle",
        image: "/assets/imgs/events/images/asthami_bg.svg",
        event_details: [
            {
                name: "Some huge name that wrecks",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
            {
                name: "RoundSol",
                time: "10:00 AM - 12:00 PM",
                round: "round1",
            },
        ],
        intro: "Some lorem text to highlight the main attraction of this day. Nothing much to talk about here",
    },
};

function EventSection({ data }) {
    const {innerWidth} = window;
    const mobileView = innerWidth<=970?true:false;

    return (
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
                alignItems: mobileView?"center":(data.date & 1 ? "flex-end" : "flex-start"),
                justifyContent: "center",
                flexDirection: "column",
                margin: "3.5rem 0",
            }}
        >
            <div style={{ position: "relative", marginBottom:  mobileView?"2rem": "5rem", textAlign: "center", lineHeight: "4em" }}>
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
                    gap: mobileView?"2rem":"4rem",
                }}
            >
                {((data.date & 1) === 1 || mobileView)&& (
                    <div
                        style={{
                            width: "25ch",
                            fontSize: mobileView?"1rem":"1.2rem",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: mobileView?"center":"flex-start",
                            gap: "1.5rem",
                            fontWeight: "200",
                            lineHeight: "1.2em",
                            textAlign: mobileView?"center":"left"
                        }}
                    >
                        {data.intro}
                        <Link to={`/events/${data.name.split(" ")[0].toLowerCase()}`}>
                            <Button innerText={"Know more"} />
                        </Link>
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
                    {data.event_details.map((event, idx) => {
                        return (
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
                                }}
                            >
                                <div
                                    className="small1"
                                    style={{
                                        fontWeight: 400,
                                        fontSize: "1.2rem",
                                        alignItems: "center",
                                        width: "15ch",
                                        wordWrap: "break-word"
                                    }}
                                >
                                    {event.name}
                                </div>
                                <div
                                    className="small1"
                                    style={{
                                        fontWeight: 200,
                                        fontSize: "1rem",
                                        width: "10ch"
                                    }}
                                >
                                    {event.round}
                                </div>
                                <div
                                    className="small1"
                                    style={{
                                        fontSize:mobileView?"1rem":"1.2rem",
                                        fontWeight: 400,
                                    }}
                                >
                                    {mobileView?event.time.slice(0, 8):event.time}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {(data.date & 1) === 0 && !mobileView && (
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
                        <Link to={`/events/${data.name.split(" ")[0].toLowerCase()}`}>
                            <Button innerText={"Know more"} />
                        </Link>
                    </div>
                )}
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
    var nights = ["Saptami Symphony", "Ashtami Aura", "Navami Nirvana", "Dashami Dazzle"];
    return (
        events && (
            <div className="schedule">
                <div className="heading">
                    <div className="event_bg">
                        <img src="/assets/imgs/events/images/header_back.webp" alt="" />
                    </div>
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
                </div>

                {nights.map((night, i) => {
                    return <EventSection data={content[night]} key={i} />;
                })}
            </div>
        )
    );
}

export default Schedule;
