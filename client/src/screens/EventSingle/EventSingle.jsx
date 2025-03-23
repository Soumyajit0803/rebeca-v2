import React, { useEffect, useState } from "react";
import "./EventSingle.css";
import Button from "../../components/Button/Button";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { extractFullDate, extractTime } from "../../components/EventList/EventList";
import RoundCard from "./RoundCard";
import { Alert } from "@mui/material";
import { Warning } from "@mui/icons-material";
import { isUserRegistered } from "../../services/eventApi";

const EventSingle = () => {
    const navigate = useNavigate();
    const { eventSlug } = useParams();
    const { allEvents, user } = useAuth();
    const [isReg, setIsReg] = useState(false);
    const [loading, setLoading] = useState(false);
    const oneEvent = allEvents.find((ev) => ev.slug === eventSlug);

    useEffect(() => {
        const checkReg = async () => {
            try {
                setLoading(true);
                if (user && oneEvent) {
                    const status = await isUserRegistered(oneEvent?._id, user?._id);
                    console.log("Status of registration of the user")
                    console.log(status);
                    setIsReg(status.data.isRegistered)
                } else {
                    console.log("Pehele login toh kar bhai")
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        checkReg();
    }, [user]);

    // Ensure allEvents is available before filtering
    if (!allEvents || allEvents.length === 0) {
        return <div style={{ height: "100vh", width: "100vw" }}>Loading...</div>;
    }

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
                    height: `300px`,
                    background: `url("${oneEvent?.thumbnail}") no-repeat`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="event-single-overlay">
                    <div className="event-single-header">
                        <span className="event-single-badge">NEW</span>
                        <h1 className="event-single-title">{oneEvent?.eventName}</h1>
                        <p className="event-single-subtitle">
                            {extractFullDate(oneEvent?.rounds[0]?.startTime)} -{" "}
                            {extractFullDate(oneEvent?.rounds[0]?.endTime)}
                        </p>
                    </div>

                    <div className="event-single-buttons">
                        <Button innerText="View Rules" href={oneEvent?.rulesDocURL} />
                        <Link to={`/event/${eventSlug}/register`}>
                            <Button innerText="Register" disabled={(user && isReg)} />
                        </Link>
                    </div>
                    {!user && (
                        <Alert severity="warning" color="warning" sx={{ mt: 1 }}>
                            You need to Log in to Register for any event.
                        </Alert>
                    )}
                    {isReg && (
                        <Alert severity="success" color="success" sx={{ mt: 1 }}>
                            You Have Successfully been registered for this event
                        </Alert>
                    )}
                </div>
            </div>

            {/* Content Below */}
            <div className="event-single-content">
                <p className="event-single-description">{oneEvent?.description}</p>
                <h2 className="schedule-title">Schedule</h2>

                <div className="prelims-container">
                    {oneEvent?.rounds.map((round, i) => {
                        return (
                            <RoundCard
                                name={round.name || `Round ${i + 1}`}
                                start={extractFullDate(round.startTime)}
                                end={extractFullDate(round.endTime)}
                                venue={round.venue}
                                key={i}
                                i={i}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EventSingle;
