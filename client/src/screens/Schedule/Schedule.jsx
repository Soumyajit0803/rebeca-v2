import React from "react";
import "./Schedule.css";
import Heading from "../../components/Heading/Heading";
import PujaHeading from "../../components/PujaHeading/PujaHeading";
// import eventDetails from "../../../public/assets/eventDetails.json";
import { Link } from "react-router-dom";
import rebeca from "../../../public/assets/rebeca.json";

var introtext = `Prepare to be swept away as you put your best foot forward in this epic celebration of creativity and culture tha promises you laughter, joy and memories that will last you a lifetime and more. Keep your water bottles handy and get ready to feel the heat cuz the 83rd edition of REBECA is back
with a bang!`;

function EventSection({ date, datetxt, eventlist, topic, about }) {
  var bgsetter = datetxt.toLowerCase();
  return (
    <div className={"event " + bgsetter + "-back"}>
      <Link to={`/events/${bgsetter}`}>
        <PujaHeading date={date} datetxt={datetxt} customcss={"left-padding"} />
      </Link>
      <div className={"event-content"}>
        <div className="list">
          <div className="timings">
            {eventlist.map((a, i) => {
              return (
                <div className="row" key={i}>
                  <div className="time">{a[0]}</div>
                  <div className="linespace"></div>
                  <div className="eventname">{a[1]}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="description">
          <div className="topic display-font">{topic}</div>
          <div className="about">{about}</div>
        </div>
      </div>
    </div>
  );
}

function Schedule() {

    function eventListSummarizer(eventlist) {
        var res = []
        for (let key in eventlist) {
            res.push([eventlist[key].time, eventlist[key].eventName])
        }
        return res
    }

    
    var nights = ["saptami", "ashtami", "navami", "dashami"];
    return (
        rebeca && (
            <div className="schedule">
                <Heading title={"REBECA SCHEDULE"} subTitle={introtext} />
                {nights.map((night, i) => {
                    return (
                        <EventSection
                            date={rebeca[night].date}
                            datetxt={night.toUpperCase()}
                            eventlist={eventListSummarizer(rebeca[night].eventList)}
                            topic={rebeca[night].nightType}
                            about={rebeca[night].intro}
                            key = {i}
                        />
                    );
                })}
            </div>
        )
    );
}

export default Schedule;
