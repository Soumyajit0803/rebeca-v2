import React from "react";
import "./EventSingle.css";
import Button from "../../components/Button/Button";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { extractFullDate, extractTime } from "../../components/EventList/EventList";

const EventSingle = () => {
    const navigate = useNavigate();
    const { eventSlug } = useParams();
    const { allEvents } = useAuth();

    // Ensure allEvents is available before filtering
    if (!allEvents || allEvents.length === 0) {
        return <div>Loading...</div>;
    }

    const oneEvent = allEvents.find((ev) => ev.slug === eventSlug);

    if (!oneEvent) {
        return <div>Event not found</div>;
    }
    return (
        <div className="event-single-container">
            {/* Background Image with Overlay */}
            <div
                className="event-single-banner"
                style={{
                    position: `relative`,
                    width: `100%`,
                    height: `400px`,
                    background: `url("${oneEvent?.thumbnail}") no-repeat`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="event-single-overlay">
                    <div className="event-single-header">
                        <span className="event-single-badge">NEW</span>
                        <h1 className="event-single-title">{oneEvent?.eventName}</h1>
                        <p className="event-single-subtitle">{extractFullDate(oneEvent?.rounds[0]?.startTime)} - {extractFullDate(oneEvent?.rounds[0]?.endTime)}</p>
                    </div>

                    <p className="event-single-description">{oneEvent?.description}</p>

                    <div className="event-single-buttons">
                        <Button innerText="View Rules" href={oneEvent?.rulesDocURL} />
                        <Link to=""></Link>
                        <Button innerText="Register" />
                    </div>
                </div>
            </div>

            {/* Content Below */}
            <div className="event-single-content">
                <h2 className="schedule-title">Schedule</h2>
                {/*<p className="schedule-item">Round 1 - 12:00 to 14:00, 12th April - Amenities</p>
        <p className="schedule-item">Round 2 - 12:00 to 14:00, 13th April - Lords</p>*/}

                <div className="prelims-container">
                    {oneEvent?.rounds.map((round, i) => {
                        return (
                            <div className="prelims-card">
                                <h3>{round.name || "Round 1"}</h3>
                                <p>{extractFullDate(round.startTime)}</p>
                                <p>{extractFullDate(round.endTime)}</p>
                                <br />
                                <p>📍 {round.venue}</p>
                                <p>📅 10th April</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EventSingle;
