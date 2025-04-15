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
import CustomAvatar from "../../components/CustomAvatar/CustomAvatar";
import PageNotFound from "../PageNotFound/PageNotFound";

function isGoogleForm(url) {
    if (!url) return false;
    const googleFormPattern = /^https:\/\/docs\.google\.com\/forms\/d\/e\/[^\/]+\/viewform/;
    const googleShortFormPattern = /^https:\/\/forms\.gle\/[a-zA-Z0-9]+/;

    return googleFormPattern.test(url) || googleShortFormPattern.test(url);
}

const EventSingle = () => {
    const navigate = useNavigate();
    const { eventSlug } = useParams();
    const { allEvents, user } = useAuth();
    const [isReg, setIsReg] = useState(false);
    const [loading, setLoading] = useState(false);
    const oneEvent = allEvents.find((ev) => ev.slug === eventSlug);
    console.log(oneEvent);

    useEffect(() => {
        const checkReg = async () => {
            try {
                setLoading(true);
                if (user && oneEvent) {
                    const status = await isUserRegistered(oneEvent?._id, user?._id);
                    // console.log("Status of registration of the user");
                    // console.log(status);
                    setIsReg(status.data.isRegistered);
                } else {
                    console.log("No user");
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        checkReg();
    }, [user, oneEvent]);

    // Ensure allEvents is available before filtering
    if (!allEvents || allEvents.length === 0) {
        return <div style={{ height: "100vh", width: "100vw" }}>Loading...</div>;
    }

    if (!oneEvent) {
        return <PageNotFound />;
    }

    return (
        <div className="event-single-container">
            {/* Background Image with Overlay */}
            <div
                className="event-single-banner"
                style={{
                    position: `relative`,
                    width: `100%`,
                    minHeight: `300px`,
                    background: `url("${oneEvent?.thumbnail}") no-repeat`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="event-single-overlay">
                    <div className="eposter">
                        <div className="regfee">Fee ₹ {oneEvent.registrationFee}</div>
                        <img src={oneEvent.poster} alt={"Poster"} />
                    </div>
                    <div className="event-single-header">
                        <span className="event-single-badge">{oneEvent?.type}</span>
                        <h1 className="event-single-title">{oneEvent?.eventName}</h1>
                        <p className="event-single-subtitle">
                            {extractFullDate(oneEvent?.rounds[0]?.startTime, true)} to{" "}
                            {extractFullDate(oneEvent?.rounds[0]?.endTime, true)}
                        </p>
                        <div className="eposter-mobile">
                            <div className="regfee">Fee ₹ {oneEvent.registrationFee}</div>
                            <img src={oneEvent.poster} alt={"Poster"} />
                        </div>
                    </div>

                    {/* {oneEvent?.rulesDocURL && <div className="event-single-buttons">
                        <Button
                            innerText={isGoogleForm(oneEvent?.rulesDocURL) ? "Google Form" : "View Rules"}
                            onClick={() => window.open(oneEvent?.rulesDocURL, "_blank")}
                        />
                        {!isGoogleForm(oneEvent?.rulesDocURL) && (
                            <Link to={`/events/${eventSlug}/register`}>
                                <Button innerText="Register" disabled={!user || !user.college} />
                            </Link>
                        )}
                    </div>}
                    {!user && (
                        <Alert
                            className="event-alert"
                            variant="outlined"
                            severity="warning"
                            color="warning"
                            sx={{ mt: 1 }}
                        >
                            You need to Log in to Register for any event.
                        </Alert>
                    )}
                    {isReg && (
                        <Alert
                            className="event-alert"
                            variant="outlined"
                            severity="success"
                            color="success"
                            sx={{ mt: 1 }}
                        >
                            You Have Successfully been registered for this event
                        </Alert>
                    )}
                    {user && !user?.college && (
                        <Alert
                            className="event-alert"
                            variant="outlined"
                            severity="warning"
                            color="warning"
                            sx={{ mt: 1 }}
                        >
                            Please complete your profile information to be able to register. For details, go to{" "}
                            <Link to="/profile">My profile</Link>.
                        </Alert>
                    )}

                    {isGoogleForm(oneEvent?.rulesDocURL) && (
                        <Alert
                            className="event-alert"
                            variant="outlined"
                            severity="info"
                            color="info"
                            sx={{ mt: 1 }}
                        >
                            This event accepts registration only through <b>google forms</b>.
                        </Alert>
                    )} */}
                    <Alert className="event-alert" variant="outlined" severity="info" color="info" sx={{ mt: 1 }}>
                        Event has concluded.
                    </Alert>
                </div>
            </div>

            {/* Content Below */}
            <div className="event-single-content">
                <p className="event-single-description">{oneEvent.description}</p>
                <h2 className="schedule-title">Schedule</h2>

                <div className="prelims-container">
                    {oneEvent?.rounds.map((round, i) => {
                        return (
                            <RoundCard
                                name={round.roundname || `Round ${i + 1}`}
                                start={extractFullDate(round.startTime)}
                                end={extractFullDate(round.endTime)}
                                venue={round.venue}
                                key={i}
                                i={i}
                                hideHeading={!oneEvent?.rulesDocURL}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="coordinators event-single-content" style={{ paddingTop: 0 }}>
                <h2 className="schedule-title">Coordinators</h2>
                <div className="coords-list">
                    {oneEvent.mainCoordinators.map((e, i) => {
                        console.log("coordinator");
                        console.log(e);
                        return <CustomAvatar title={e.name} subtitle={e.role} phone={e.phone} src={e.image} key={i} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default EventSingle;
