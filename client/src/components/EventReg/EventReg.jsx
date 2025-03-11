import React, { useState } from "react";
import { Container, CardContent, Card, Typography, Button, StepLabel, Step, Stepper, Box } from "@mui/material";
import Payment from "./Payment";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import SingleUserInfo from "./SingleUserInfo";
import TeamInfo from "./TeamInfo";
import { ArrowForward, CheckCircle } from "@mui/icons-material";
import { useAuth } from "../../AuthContext";

const allAreIIESTians = (team) => {
    for (let member in team) {
        if (member.email.endsWith("iiests.ac.in")) continue;
        else return false;
    }
    return true;
};

const steps = ["Getting data", "Payment", "Completed"];

const Step1Content = ({ mode, setValid, user, selectedItems, setSelectedItems }) => {
    return mode === "single" ? (
        <SingleUserInfo setValid={setValid} user={user} />
    ) : (
        <TeamInfo setValid={setValid} user={user} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    );
};
const Step2Content = ({ event, free, setValid, setFile, regfee }) => (
    <Payment eventName={event} regfee={regfee} setValid={setValid} setFile={setFile} free={free} />
);
const Step3Content = () => {
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
    return (
        <Card>
            <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <CheckCircle color="primary" sx = {{width: '6rem', height: '6rem'}}/>
                <Typography variant="h5">
                    Congratulations!
                </Typography>
                <Typography variant="body1" color="grey" sx = {{mb: 2}}>You are now Registered.</Typography>
                <Button onClick={() => navigate("/events")} variant="contained" color="primary">
                    Go to Events
                </Button>
            </CardContent>
        </Card>
    );
};

const EventReg = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { eventName } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [valid, setValid] = useState({ step1: false, step2: false, step3: true });
    const [file, setFile] = useState(null);
    const { user } = useAuth();
    const [selectedItems, setSelectedItems] = useState([]);

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
                return (
                    <Step1Content
                        setValid={() => setValid({ ...valid, step1: true })}
                        user={user}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                    />
                );
            case 1:
                return (
                    <Step2Content
                        setValid={() => setValid({ ...valid, step2: true })}
                        event={"Coolest Event"}
                        free={user.email.endsWith(".iiests.ac.in") && allAreIIESTians(selectedItems)}
                        setFile={setFile}
                        regfee={1200}
                    />
                );
            case 2:
                return <Step3Content />;
            default:
                return "Unknown step";
        }
    };

    const handleRegister = () => {
        console.log("Registration data to be sent: ");
        console.log(file);
        console.log(selectedItems);
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
