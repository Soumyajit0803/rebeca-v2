import React from "react";
import "./Schedule.css";
import Heading from "../../components/Heading/Heading";
import PujaHeading from "../../components/PujaHeading/PujaHeading";
import contents from "../../assets/data/contents.json"
import events from "../../assets/data/events.json"

var introtext = `Prepare to be swept away as you put your best foot forward in this epic celebration of creativity and culture tha promises you laughter, joy and memories that will last you a lifetime and more. Keep your water bottles handy and get ready to feel the heat cuz the 83rd edition of REBECA is back
with a bang!`;

function EventSection({ date, datetxt, eventlist, topic, about }) {
    var bgsetter = datetxt.toLowerCase();
    return (
        <div className={"event " + bgsetter + "-back"}>
            <PujaHeading date={date} datetxt={datetxt} customcss={"left-padding"} />
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
        contents && events && (
            <div className="schedule">
                <Heading title={"REBECA SCHEDULE"} subTitle={introtext} />
                {nights.map((night, i) => {
                    return (
                        <EventSection
                            date={contents[night].date}
                            datetxt={night.toUpperCase()}
                            eventlist={eventListSummarizer(events[night].eventList)}
                            topic={contents[night].nightType}
                            about={contents[night].intro}
                            key = {i}
                        />
                    );
                })}
            </div>
        )
    );
}

export default Schedule;
