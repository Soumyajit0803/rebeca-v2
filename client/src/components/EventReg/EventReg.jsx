import React, { useState, useEffect } from "react";
import {
    Container,
    CardContent,
    Card,
    Typography,
    StepLabel,
    Step,
    Button,
    Stepper,
    Alert,
    AlertTitle,
    CircularProgress,
} from "@mui/material";
import Payment from "./Payment";
import { useParams, useNavigate } from "react-router-dom";
import GetData from "./GetData";
import { ArrowForward, CheckCircle, DeviceUnknown, Edit, HelpCenterRounded, NoteAlt } from "@mui/icons-material";
import { useAuth } from "../../AuthContext";
import { postImage } from "../../services/imgApi";
import { enrollUser, isUserRegistered } from "../../services/eventApi";

const allAreIIESTians = (team) => {
    console.log("THIS IS CHECKING FOR IIESTians:");
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
            <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <NoteAlt color="primary" sx={{ width: "6rem", height: "6rem" }} />
                <Typography variant="h5">Final Submit</Typography>
                <Typography variant="body1" color="grey" sx={{ mb: 2, textAlign: "center" }}>
                    Submit your Data. It will be reviewed by the respective event coordinators. You will receive a mail
                    about the status of your event registration shortly.
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
                <CheckCircle color="success" sx={{ width: "6rem", height: "6rem" }} />
                <Typography variant="h5">Congratulations!</Typography>
                <Typography variant="body1" color="grey" sx={{ mb: 2 }}>
                    You are now Registered.
                </Typography>
                <Button onClick={() => navigate("/events")} innerText={"Go to Events"}></Button>
            </CardContent>
        </Card>
    );
};
const NoUserLoggedIn = () => {
    const navigate = useNavigate();
    return (
        <Card sx={{ width: "min(100%, 400px)" }}>
            <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}>
                <HelpCenterRounded color="warning" sx={{ width: "6rem", height: "6rem" }} />
                <Typography variant="h5">User Not Found</Typography>
                <Typography variant="body1" color="grey" sx={{ mb: 2, textAlign: "center" }}>
                    If you want to proceed with the registration, please log in first
                </Typography>
                <Button onClick={() => navigate("/events")} variant="contained" color="primary">
                    Go to Events
                </Button>
            </CardContent>
        </Card>
    );
};
const NoSuchEvent = () => {
    return (
        <Card sx={{ width: "min(100%, 400px)" }}>
            <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}>
                <HelpCenterRounded color="error" sx={{ width: "6rem", height: "6rem" }} />
                <Typography variant="h5">No Such Event Exists</Typography>
                <Typography variant="body1" color="grey" sx={{ mb: 2, textAlign: "center" }}>
                    Possibly there is a problem in the URL.
                </Typography>
                <Button onClick={() => navigate("/events")} variant="contained" color="primary">
                    Go to Events
                </Button>
            </CardContent>
        </Card>
    );
};
const Loading = () => {
    return (
        <Card sx={{ width: "min(100%, 400px)" }}>
            <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}>
                <CircularProgress color="primary" size={80} thickness={5} />
                <Typography variant="h5">Fetching Data...</Typography>
                <Typography variant="body1" color="grey" sx={{ mb: 2, textAlign: "center" }}>
                    While it's loading, shout out 'REBECA'!
                </Typography>
            </CardContent>
        </Card>
    );
};

const EventReg = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { eventSlug } = useParams();
    const navigate = useNavigate();
    const [valid, setValid] = useState({ step1: false, step2: false, step3: true });
    const [file, setFile] = useState(null);
    const [assets, setAssets] = useState("");
    const { user, allEvents, eventsLoad } = useAuth();
    const [selectedItems, setSelectedItems] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageLoad, setPageLoad] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isReg, setIsReg] = useState(false);
    const oneEvent = allEvents?.find((ev) => ev.slug === eventSlug);
    // handling invalid event slug left here

    useEffect(() => {
        const checkReg = async () => {
            try {
                setPageLoad(true);
                if (user && oneEvent) {
                    console.log("Got'em all!!");
                    const status = await isUserRegistered(oneEvent?._id, user?._id);
                    console.log("Status of registration of the user");
                    console.log(status);
                    setIsReg(status.data.isRegistered);
                    // if (status.data.isRegistered) setActiveStep(3);
                    setActiveStep(0);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setPageLoad(false);
            }
        };
        checkReg();
    }, [user, oneEvent]);

    const handleNext = () => {
        console.log(activeStep);
        if (activeStep === 2) {
            handleRegister();
        } else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    oneEvent && (
                        <GetData
                            setValid={(status) => setValid({ ...valid, step1: status })}
                            user={user}
                            selectedItems={selectedItems}
                            setSelectedItems={setSelectedItems}
                            mode={oneEvent?.type}
                            teamName={teamName}
                            setTeamName={setTeamName}
                            minSize={oneEvent?.minTeamSize - 1}
                            maxSize={oneEvent?.maxTeamSize - 1}
                            eventId={oneEvent?._id}
                            assets={assets}
                            setAssets={setAssets}
                            isAssetReq={oneEvent?.assets}
                        />
                    )
                );
            case 1:
                return (
                    oneEvent && (
                        <Payment
                            setValid={() => setValid({ ...valid, step2: true })}
                            event={"Coolest Event"}
                            free={
                                (user.email.endsWith(".iiests.ac.in") && allAreIIESTians(selectedItems)) ||
                                oneEvent?.registrationFee === 0
                            }
                            setFile={setFile}
                            regfee={oneEvent?.registrationFee}
                            paymentQR={oneEvent?.paymentQR}
                        />
                    )
                );
            case 2:
                return <FinishMessage />;
            default:
                return "default";
        }
    };

    const handleRegister = async () => {
        try {
            setLoading(true);
            const regData = new FormData();
            regData.append("eventId", oneEvent?._id);
            regData.append("userId", user?._id);
            regData.append("eventSlug", eventSlug);
            regData.append("eventName", oneEvent?.eventName);
            regData.append("userEmail", user?.email);
            regData.append("teamName", teamName);
            if (oneEvent?.assets) regData.append("assets", assets);
            if (selectedItems.length > 0)
                regData.append("teamMembers", JSON.stringify(selectedItems.map((member) => member._id)));
            const paymentURL = await handleSubmitImage(file);
            if (file) regData.append("paymentScreenshot", paymentURL);

            const result = await enrollUser(regData);
            console.log("Registration successful:", result?.data);
            setActiveStep((prevStep) => prevStep + 1);
        } catch (err) {
            console.error("Error:", err);
            setErrorMsg(JSON.stringify(err));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitImage = async (imageFile) => {
        // <- This will send the selected image to our api
        try {
            const res = await postImage({ image: imageFile });
            console.log(res.data.data.imageUrl);
            return res.data.data.imageUrl;
        } catch (err) {
            console.log(err);
            const errormsg = err.response ? err.response.data.message : err.message;
            setErrorMsg(errormsg);
        }
    };

    if (pageLoad || eventsLoad)
        return (
            <div
                style={{
                    marginTop: "6rem",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.5rem",
                }}
            >
                <Loading />
            </div>
        );

    if (user && oneEvent)
        return (
            <Container maxWidth="sm" sx={{ mt: "5rem", mb: 5 }}>
                {isReg && <Alert severity="warning" sx={{ mb: 2 }} color="warning">
                    <AlertTitle>Repeat Registration</AlertTitle>
                    You have already registered once for this event. Please make sure this event allows multiple registrations before registering again.
                </Alert>}
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
                            {user && (
                                <div style={{ marginTop: "16px" }}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        style={{ marginRight: "8px" }}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        disabled={valid[`step${activeStep + 1}`] === false}
                                        endIcon={<ArrowForward />}
                                        loading={loading}
                                    >
                                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {errorMsg && (
                    <Alert color="error">
                        <AlertTitle>Some Error Occured</AlertTitle>
                        Some Error occured. detailed Description below:
                        {errorMsg}
                    </Alert>
                )}
            </Container>
        );
    else if (!oneEvent)
        return (
            <div
                style={{
                    marginTop: "6rem",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.5rem",
                }}
            >
                <NoSuchEvent />
            </div>
        );
    else if (!user)
        return (
            <div
                style={{
                    marginTop: "6rem",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.5rem",
                }}
            >
                <NoUserLoggedIn />
            </div>
        );
    else
        return (
            <div
                style={{
                    marginTop: "6rem",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.5rem",
                }}
            >
                <Loading />
            </div>
        );
};

export default EventReg;
