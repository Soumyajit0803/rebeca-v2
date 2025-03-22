import React, { useState } from "react";
import { Container, CardContent, Card, Typography, Button, StepLabel, Step, Stepper, Box } from "@mui/material";
import Payment from "./Payment";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import GetData from "./GetData";
import { ArrowForward, CheckCircle } from "@mui/icons-material";
import { useAuth } from "../../AuthContext";

import { enrollUser } from "../../services/eventApi";

const allAreIIESTians = (team) => {
    console.log("THIS IS CHECKING FOR IIESTians:")
    console.log(team);
    
    for (let member of team) {
        if (member?.email?.endsWith("iiests.ac.in")) continue;
        else return false;
    }
    return true;
};

const steps = ["Getting data", "Payment", "Completed"];

const FinishMessage = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Step 3: Registration Completed
                </Typography>
                <Typography variant="body1">
                    Congratulations! Your registration is complete. You will receive a confirmation email shortly.
                </Typography>
            </CardContent>
        </Card>
    );
};
const CompletedContent = () => {
    const navigate = useNavigate();
    return (
        <Card>
            <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <CheckCircle color="primary" sx={{ width: "6rem", height: "6rem" }} />
                <Typography variant="h5">Congratulations!</Typography>
                <Typography variant="body1" color="grey" sx={{ mb: 2 }}>
                    You are now Registered.
                </Typography>
                <Button onClick={() => navigate("/events")} variant="contained" color="primary">
                    Go to Events
                </Button>
            </CardContent>
        </Card>
    );
};

const EventReg = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { eventSlug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [valid, setValid] = useState({ step1: false, step2: false, step3: true });
    const [file, setFile] = useState(null);
    const { user, allEvents } = useAuth();
    const [selectedItems, setSelectedItems] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [loading, setLoading] = useState(false);

    console.log("location:\n");
    console.log(location);

    const oneEvent = allEvents?.find((ev) => ev.slug === eventSlug);

    const handleNext = () => {
        if (activeStep === 2) {
            handleRegister();
        }
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return oneEvent && (
                    <GetData
                        setValid={(status) => setValid({ ...valid, step1: status })}
                        user={user}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        mode={oneEvent?.type}
                        teamName={teamName}
                        setTeamName={setTeamName}
                        minSize={oneEvent?.minTeamSize-1}
                        maxSize={oneEvent?.maxTeamSize-1}
                        eventId = {oneEvent?._id}
                    />
                );
            case 1:
                return (
                    <Payment
                        setValid={() => setValid({ ...valid, step2: true })}
                        event={"Coolest Event"}
                        free={user.email.endsWith(".iiests.ac.in") && allAreIIESTians(selectedItems)}
                        setFile={setFile}
                        regfee={oneEvent?.registrationFee}
                    />
                );
            case 2:
                return <FinishMessage />;
            default:
                return "Unknown step";
        }
    };

    const handleRegister = async () => {
        try {
            setLoading(true);
            const regData = new FormData();
            regData.append("eventSlug", eventSlug);
            regData.append("userEmail", user.email);
            regData.append("teamName", teamName);
            regData.append("selectedItems", JSON.stringify(selectedItems));
            if (file) regData.append("paymentReceipt", file);

            const response = await enrollUser({ eventId: oneEvent?._id, userId: user?._id });

            const result = await response.json();

            console.log("Registration successful:", result.data);
            setActiveStep((prevStep) => prevStep + 1);
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: "5rem" }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div style={{ marginTop: "24px" }}>
                {activeStep === steps.length ? (
                    <CompletedContent />
                ) : (
                    <div>
                        {getStepContent(activeStep)}
                        <div style={{ marginTop: "16px" }}>
                            <Button disabled={activeStep === 0} onClick={handleBack} style={{ marginRight: "8px" }}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                disabled={valid[`step${activeStep + 1}`] === false}
                                endIcon={<ArrowForward />}
                            >
                                {activeStep === steps.length - 1 ? "Finish" : "Next"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default EventReg;
