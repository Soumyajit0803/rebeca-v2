import React from "react";
import { Card, CardContent, Typography, Grid2, Button, IconButton, Container } from "@mui/material";
import {
    Event as EventIcon,
    Description as DescriptionIcon,
    Schedule as ScheduleIcon,
    Place as PlaceIcon,
    Group as GroupIcon,
    MonetizationOn as MonetizationOnIcon,
    Person as PersonIcon,
    Image as ImageIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const sampleEvent = {
    eventName: "Tech Innovators Hackathon",
    description: "A 24-hour hackathon to build innovative tech solutions for real-world problems.",
    rounds: [
        {
            roundno: 1,
            startTime: new Date("2023-11-15T09:00:00"),
            endTime: new Date("2023-11-15T12:00:00"),
            venue: "Main Auditorium",
            description: "Ideation and team formation round.",
            roundname: "Ideation Round",
        },
        {
            roundno: 2,
            startTime: new Date("2023-11-15T13:00:00"),
            endTime: new Date("2023-11-16T13:00:00"),
            venue: "Lab Building",
            description: "Coding and development round.",
            roundname: "Coding Round",
        },
    ],
    rulesDocURL: "https://example.com/rules.pdf",
    minTeamSize: 2,
    maxTeamSize: 5,
    type: "team",
    poster: "https://example.com/poster.jpg",
    thumbnail: "https://example.com/thumbnail.jpg",
    registrationFee: 500,
    mainCoordinators: ["64f8a7b8f1a2b3c4d5e6f789", "64f8a7b8f1a2b3c4d5e6f790"], // Sample ObjectIds
};

const EventPopup2 = () => {
    const navigate = useNavigate();
    const { eventSlug } = useParams();
    console.log(eventSlug);

    const { allEvents } = useAuth();
    const oneEvent = allEvents.filter((ev) => ev.slug === eventSlug)[0];
    console.log(allEvents);


    const {
        eventName,
        description,
        rounds,
        rulesDocURL,
        minTeamSize,
        maxTeamSize,
        type,
        poster,
        thumbnail,
        registrationFee,
        mainCoordinators,
    } = oneEvent?oneEvent:sampleEvent;

    return (
        oneEvent && (
            <Container maxWidth="md" sx={{ mt: "5rem", bgcolor: "primary" }}>
                <Card sx={{ marginTop: 4, padding: 2 }}>
                    <CardContent>
                        {/* Event Name */}
                        <Grid2 container spacing={2} alignItems="center">
                            <Grid2 item>
                                <EventIcon color="primary" />
                            </Grid2>
                            <Grid2 item>
                                <Typography variant="h4" component="h1">
                                    {eventName}
                                </Typography>
                            </Grid2>
                        </Grid2>

                        {/* Description */}
                        <Grid2 container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                            <Grid2 item>
                                <DescriptionIcon color="primary" />
                            </Grid2>
                            <Grid2 item>
                                <Typography variant="body1">{description}</Typography>
                            </Grid2>
                        </Grid2>

                        {/* Rounds */}
                        {rounds.map((round, index) => (
                            <Card key={index} sx={{ mt: 2, p: 2 }}>
                                <Typography variant="h6" component="h2">
                                    Round {round.roundno}: {round.roundname}
                                </Typography>
                                <Grid2 container spacing={2} sx={{ mt: 1 }}>
                                    <Grid2 item>
                                        <ScheduleIcon color="primary" />
                                    </Grid2>
                                    <Grid2 item>
                                        <Typography variant="body1">
                                            {round.startTime.toLocaleString()} - {round.endTime.toLocaleString()}
                                        </Typography>
                                    </Grid2>
                                </Grid2>
                                <Grid2 container spacing={2} sx={{ mt: 1 }}>
                                    <Grid2 item>
                                        <PlaceIcon color="primary" />
                                    </Grid2>
                                    <Grid2 item>
                                        <Typography variant="body1">{round.venue}</Typography>
                                    </Grid2>
                                </Grid2>
                                {round.description && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {round.description}
                                    </Typography>
                                )}
                            </Card>
                        ))}

                        {/* Rules Document URL */}
                        <Grid2 container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                            <Grid2 item>
                                <DescriptionIcon color="primary" />
                            </Grid2>
                            <Grid2 item>
                                <Typography variant="body1">
                                    <a href={rulesDocURL} target="_blank" rel="noopener noreferrer">
                                        Rules Document
                                    </a>
                                </Typography>
                            </Grid2>
                        </Grid2>

                        {/* Team Size */}
                        {type === "team" && (
                            <Grid2 container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                                <Grid2 item>
                                    <GroupIcon color="primary" />
                                </Grid2>
                                <Grid2 item>
                                    <Typography variant="body1">
                                        Team Size: {minTeamSize} - {maxTeamSize}
                                    </Typography>
                                </Grid2>
                            </Grid2>
                        )}

                        {/* Event Type */}
                        <Grid2 container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                            <Grid2 item>
                                <PersonIcon color="primary" />
                            </Grid2>
                            <Grid2 item>
                                <Typography variant="body1">
                                    Event Type: {type === "team" ? "Team" : "Single"}
                                </Typography>
                            </Grid2>
                        </Grid2>

                        {/* Poster and Thumbnail */}
                        <Grid2 container spacing={2} sx={{ mt: 2 }}>
                            <Grid2 item>
                                <ImageIcon color="primary" />
                            </Grid2>
                            <Grid2 item>
                                <Typography variant="body1">
                                    <a href={poster} target="_blank" rel="noopener noreferrer">
                                        Poster
                                    </a>{" "}
                                    |{" "}
                                    <a href={thumbnail} target="_blank" rel="noopener noreferrer">
                                        Thumbnail
                                    </a>
                                </Typography>
                            </Grid2>
                        </Grid2>

                        {/* Registration Fee */}
                        <Grid2 container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                            <Grid2 item>
                                <MonetizationOnIcon color="primary" />
                            </Grid2>
                            <Grid2 item>
                                <Typography variant="body1">Registration Fee: ₹{registrationFee}</Typography>
                            </Grid2>
                        </Grid2>

                        {/* Main Coordinators */}
                        <Grid2 container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                            <Grid2 item>
                                <PersonIcon color="primary" />
                            </Grid2>
                            <Grid2 item>
                                <Typography variant="body1">
                                    Main Coordinators: {JSON.stringify(mainCoordinators.join(", "))}
                                </Typography>
                            </Grid2>
                        </Grid2>

                        {/* Register Button */}
                        <Grid2 container justifyContent="center" sx={{ mt: 4 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => navigate(`/events/${eventSlug}/register`)}
                            >
                                Register
                            </Button>
                        </Grid2>
                    </CardContent>
                </Card>
            </Container>
        )
    );
};

export default EventPopup2;
