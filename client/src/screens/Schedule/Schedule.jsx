import React from "react";
import "./Schedule.css";
import Heading from "../../components/Heading/Heading";   

function ScheduleIntro() {
    return (
        <div className="intro">
            <div className="heading">REBECA SCHEDULE</div>
            <div className="paragraph">
                Prepare to be swept away as you put your best foot forward in this epic celebration of creativity and
                culture tha promises you laughter, joy and memories that will last you a lifetime and more. Keep your
                water bottles handy and get ready to feel the heat cuz the 83rd edition of <span>REBECA</span> is back
                with a bang!
            </div>
        </div>
    );
}

var introtext = `Prepare to be swept away as you put your best foot forward in this epic celebration of creativity and culture tha promises you laughter, joy and memories that will last you a lifetime and more. Keep your water bottles handy and get ready to feel the heat cuz the 83rd edition of REBECA is back
with a bang!`

var eventlist = [
    ["10AM - 11AM", "Inauguration"],
    ["11AM", "SaturnWalia"],
    ["11AM", "Arrival"],
    ["11AM", "Typist Journey"],
    ["11AM", "Verse Wars"],
    ["11AM", "Arrival"],
    ["11AM", "SaturnWalia"],
    ["11AM", "Verse Wars"],
];

var about = `The classical night
Get ready to soak in the rich heritage of Indian culture as talented artists from all across the nation weave together a tapestry of grace and timeless magic, filling the air with the tunes of celebration and marking the very beginning of our very own Pujo.`;

function EventSection({ date, datetxt, eventlist, topic, about }) {
    var bgsetter = datetxt.toLowerCase();
    return (
		<div className={"event " + bgsetter + "-back"}>
			<div className="eheading">
				<div
					className={`before ${datetxt.toLowerCase(bgsetter)}`}
				></div>
				<div className="big display-font">{date}</div>
				<div className="small display-font">
					<span>April</span>
					<span style={{ paddingLeft: "1rem", fontSize: "3rem" }}>
						{datetxt}
					</span>
				</div>
			</div>
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
    return (
        <div className="schedule">
            {/* <ScheduleIntro /> */}
            <Heading title={"REBECA SCHEDULE"} subTitle={introtext}/>
            <EventSection
                date={"20"}
                datetxt={"SAPTAMI"}
                eventlist={eventlist}
                topic={"Classical Night"}
                about={about}
            />
            <EventSection
                date={"20"}
                datetxt={"ASHTAMI"}
                eventlist={eventlist}
                topic={"Classical Night"}
                about={about}
            />
            <EventSection
                date={"20"}
                datetxt={"NAVAMI"}
                eventlist={eventlist}
                topic={"Classical Night"}
                about={about}
            />
            <EventSection
                date={"20"}
                datetxt={"DASHAMI"}
                eventlist={eventlist}
                topic={"Classical Night"}
                about={about}
            />
        </div>
    );
}

export default Schedule;
