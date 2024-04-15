import React from "react";
import "./Schedule.css";
import Heading from "../../components/Heading/Heading";
import PujaHeading from "../../components/PujaHeading/PujaHeading";
import contents from "../../assets/data/contents.json";
import events from "../../assets/data/events.json";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import EventList from "../../components/EventList/EventList";
import Eventcard from "../../components/Eventcard/Eventcard";

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
        {width > 580 ? <EventList eventlist={eventlist} /> : <Eventcard Eventdata={eventlist} Eventday={datetxt} />}
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

const onButtonClick = () => {
	const pdfUrl = "/assets/rebecaRuleBook.pdf";
	const link = document.createElement("a");
	link.href = pdfUrl;
	link.download = "rebecaRuleBook.pdf"; // specify the filename
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

function Schedule() {
  // function eventListSummarizer(eventlist) {
  //   var res = [];
  //   for (let key in eventlist) {
  //     res.push([eventlist[key].time, eventlist[key].eventName]);
  //   }
  //   return res;
  // }
  const { innerWidth: width, innerHeight: height } = window;


	var nights = ["saptami", "ashtami", "navami", "dashami"];
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
						endIcon={
							<span className="material-icons">
								file_download
							</span>
						}
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
                <EventList eventlist={events["Pre Events"].eventList} />
              ) : (
                <Eventcard Eventdata={events["Pre Events"].eventList} Eventday={"saptami"} />
              )}
              <div className="description">
                {/* <div className="topic display-font">
									Pre Events
								</div> */}
                <div className="about">
                  Get ready to dive into the festivities early with our pre-events, featuring workshops, performances,
                  and interactive activities to ignite your passion for culture and creativity.
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
        {nights.map((night, i) => {
          return (
            <EventSection
              date={contents[night].date}
              datetxt={night.toUpperCase()}
              eventlist={events[night].eventList}
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
