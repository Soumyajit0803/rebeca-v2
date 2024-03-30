import React from "react";
import Button from "../Button/Button.jsx";
import "./EventPopup.css";

var title = "Kolkata Night";
var desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget dignissim velit rhoncus ut. Quisque efficitur velit ac euismod cursus. Curabitur at erat eu mi gravida scelerisque. Aenean quis interdum nibh.`;
var rules = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, condimentum in laoreet in, congue in libero. Ut viverra cursus diam, eget",
];

var judges = ["person", "person", "person", "person"];

const EventPopup = ({ img, title, desc, judges, rules, time, venue }) => {
    return (
        <div className={"event-popup " + img + "-event-popup"}>
            <div className="event-head">{title}</div>
            <div className="event-desc">{desc}</div>
            <div className="event-details">
              <div className="event-time">{time}</div>
              <div className="event-venue">{venue}</div>
            </div>
            <Button innerText={"RSVP NOW"} />
            <div className="event-head" style={{ marginBottom: "0em", marginTop: "1em" }}>
                Rules
            </div>
            <div className="rules-list-contain">
                <ul className="rules-list">
                    {rules.map((rule, i) => {
                        return (
                            <li key={i} className="rule-item">
                                {rule}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="event-head" style={{ marginBottom: "0em", marginTop: "1em" }}>
                Judges
            </div>
            <div className="judges">
                {judges.map((judge, i) => {
                    return (
                        <div className="judge" key={i}>
                            <img
                                src={`/assets/imgs/ProfileImg/${judge}.png`}
                                alt=""
                                srcSet=""          
                                className="judge-pic"
                            />
                            <span>{judge}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

function Check() {
    return <EventPopup img={"saptami"} title={title} desc={desc} rules={rules} judges={judges} time={"12:00 AM"} venue={"Lords Ground"}/>;
}

export default EventPopup;
