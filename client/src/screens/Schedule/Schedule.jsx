import React, { useState } from "react";
import "./Schedule.css";
import Heading from "../../components/Heading/Heading";
import PujaHeading from "../../components/PujaHeading/PujaHeading";
import events from "../../assets/data/events.json";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import EventList from "../../components/EventList/EventList";
import Eventcard from "../../components/Eventcard/Eventcard";
import { getAllEvents } from "../../services/eventApi";
import { useEffect } from "react";
import { useAuth } from "../../AuthContext";

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
    intro:
      "Some lorem text to highlight the main attraction of this day. Nothing much to talk about here",
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
    intro:
      "Some lorem text to highlight the main attraction of this day. Nothing much to talk about here",
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
    intro:
      "Some lorem text to highlight the main attraction of this day. Nothing much to talk about here",
  },
  "Dashami Dazzle": {
    date: 13,
    name: "Dashami Dazzle",
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
    intro:
      "Some lorem text to highlight the main attraction of this day. Nothing much to talk about here",
  },
};

function EventSection({ data }) {
  //   var bgsetter = datetxt.toLowerCase();
  const { innerWidth: width, innerHeight: height } = window;

  return (
    <div
      className="event"
      style={{
        backgroundImage: `url(${data.image})`,
        backgroundSize: "700px",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        padding: "20px",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <div style={{position: "relative", marginBottom: "50px"}}>
        <div className="day-title" data-text= {data.name}>{data.name}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {(data.date & 1) === 1 && (
          <div style={{ width: "250px" }}>{data.intro}</div>
        )}

        <div className="Outer-div" style={{ marginX: "100px"}}>
          {data.event_details.map((event, idx) => {
            return (
              <div
                key={idx}
                className="one"
                style={{
                  outline: "1px solid #c1c1c1",
                  borderRadius: "10px",
                  padding: "10px",
                  display: "flex",
                  width: "862px",
                  height: "78px",
                  justifyContent: "space-between",
                  marginBottom: "10px", // add spacing between rows
                  paddingLeft: "25px", 
                  paddingRight: "25px", 
                }}
              >
                <div
                  className="small1"
                  style={{
                    fontFamily: "'Emilys Candy', cursive",
                    fontWeight: 400,
                    fontSize: "35px",
                    letterSpacing: "0%",
                    alignItems: "center",
                    color: "#fff", // stand out on dark background
                  }}
                >
                  {event.name}
                </div>
                <div
                  className="small1"
                  style={{
                    fontFamily: "'Emilys Candy', cursive",
                    fontWeight: 400,
                    fontSize: "21px",
                    letterSpacing: "0%",
                    alignContent: "center",
                    justifyContent: "center",
                    color: "#fff", // stand out on dark background
                  }}
                >
                  {event.round}
                </div>
                <div
                  className="small1"
                  style={{
                    fontFamily: "'Emilys Candy', cursive",
                    fontWeight: 400,
                    fontSize: "30px",
                    letterSpacing: "0%",
                    alignItems: "center",
                    color: "#fff", // stand out on dark background
                }}
                >
                  {event.time}
                </div>
              </div>
            );
          })}
        </div>

        {(data.date & 1) === 0 && (
            <div style={{ width: "250px", 
                fontFamily: "'Emilys Candy', cursive",
                fontWeight: 400,
                fontSize: "30px",
                letterSpacing: "0%",
           }}>{data.intro}</div>
        )}
      </div>
    </div>
  );

  /* <Link to={`/events/${bgsetter}`}>
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
      </div> */
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
  const { allEvents, setAllEvents } = useAuth();
  const [loading, setLoading] = useState(false);
  console.log(allEvents);

  const { innerWidth: width, innerHeight: height } = window;

  var nights = [
    "Saptami Symphony",
    "Ashtami Aura",
    "Navami Nirvana",
    "Dashami Dazzle",
  ];
  return (
    events && (
      <div className="schedule">
        <div className="heading">
          <div className="bg">
            <img src="/assets/imgs/events/images/heading.svg" alt="" />
          </div>
          <div className="title display-font">REBECA SCHEDULE</div>
          <div className="sub-title">{introtext}</div>
        </div>

        {/* <div className={"event pre-event"}> */}
        {/* <Link to={`/events/${bgsetter}`}>
							{/* <PujaHeading
								date={date}
								datetxt={datetxt}
								customcss={"left-padding"}
							/> */}
        {/* </Link> */}
        {/* <div className="eheading">
            <div className="small">
              <span></span>
              <div className="big1">Misc. Events</div>
            </div>
          </div>
          <div className={"event-content"}>
            {width > 580 ? (
              <EventList eventlist={events["Pre Events"].eventList} />
            ) : (
              <Eventcard
                Eventdata={events["Pre Events"].eventList}
                Eventday={"saptami"}
              />
            )}
            <div className="description">
              {/* <div className="topic display-font">
									Pre Events
								</div> 
              <div className="about">
                Get ready to dive into the festivities early with our
                pre-events, featuring workshops, performances, and interactive
                activities to ignite your passion for culture and creativity.
              </div> */}

        {/* <Link to={`/events/${bgsetter}`}>
									<Button
										variant={"filled"}
										innerText={"Learn more"}
									></Button>
								</Link>
            </div>
          </div>
                                 */}
        {/* </div> */}

        {nights.map((night, i) => {
          return <EventSection data={content[night]} key={i} />;
        })}
      </div>
    )
    // <EventPopup />
  );
}

export default Schedule;
