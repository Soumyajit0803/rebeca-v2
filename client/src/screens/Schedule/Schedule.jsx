import React from "react";
import "./Schedule.css";
import Heading from "../../components/Heading/Heading";
import PujaHeading from "../../components/PujaHeading/PujaHeading";
import contents from "../../assets/data/contents.json";
import events from "../../assets/data/events.json";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import EventList from "../../components/EventList/EventList";

var introtext = `Experience the timeless tradition of REBECA! Join us for an unforgettable celebration filled with music, dance, competitions, and workshops. Embrace the vibrant spirit of our community as we come together to create lasting memories and forge new friendships. From electrifying performances to engaging activities, there's something for everyone to enjoy. Don't miss out on this exciting event that honors our college's rich heritage and brings us closer together.`;

function EventSection({ date, datetxt, eventlist, topic, about }) {
  var bgsetter = datetxt.toLowerCase();
  return (
		<div className={"event " + bgsetter + "-back"}>
			<Link to={`/events/${bgsetter}`}>
				<PujaHeading
					date={date}
					datetxt={datetxt}
					customcss={"left-padding"}
				/>
			</Link>
			<div className={"event-content"}>
				<EventList eventlist={eventlist}/>
				<div className="description">
					<div className="topic display-font">{topic}</div>
					<div className="about">{about}</div>

					<Link to={`/events/${bgsetter}`}>
						<Button
							variant={"filled"}
							innerText={"Learn more"}
						></Button>
					</Link>
				</div>
			</div>
		</div>
  );
}

function Schedule() {
    function eventListSummarizer(eventlist) {
        var res = [];
        for (let key in eventlist) {
            res.push([eventlist[key].time, eventlist[key].eventName]);
        }
        return res;
    }

    var nights = ["saptami", "ashtami", "navami", "dashami"];
    return (
        contents &&
        events && (
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
