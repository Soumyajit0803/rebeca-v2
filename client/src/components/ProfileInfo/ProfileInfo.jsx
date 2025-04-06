import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    TextField,
    Avatar,
    Button,
    Grid2,
    Paper,
    IconButton,
    Snackbar,
    Alert,
    InputAdornment,
    AlertTitle,
    Card,
    CardContent,
} from "@mui/material";
import {
    Email,
    Phone,
    School,
    Engineering,
    CalendarToday,
    Edit,
    Person,
    Save,
    PersonSearch,
} from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../../AuthContext";
import { postImage } from "../../services/imgApi";
import { updateMember } from "../../services/userApi";
import { useNavigate } from "react-router-dom";

const NoUser = () => {
    const navigate = useNavigate()
    return (
        <Card sx={{ width: "min(100%, 400px)" }}>
            <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}>
                <PersonSearch color="error" sx={{ width: "6rem", height: "6rem" }} />
                <Typography variant="h5">No User found</Typography>
                <Typography variant="body1" color="grey" sx={{ mb: 2, textAlign: "center" }}>
                    No User Found. Please log in to see your details
                </Typography>
                <Button onClick={() => navigate("/")} variant="contained" color="primary">
                    Go to Home
                </Button>
            </CardContent>
        </Card>
    );
};

const ProfileDashboard = () => {
    const formData = new FormData();
    const [dopen, setDopen] = useState(false);

    const [popup, setPopUp] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const [messageTitle, setMessageTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const [imageFile, setImageFile] = useState([]);
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        setUserData({
            image: user?.image, // Placeholder image URL
            name: user?.name,
            email: user?.email,
            phone: user?.phone || "",
            college: user?.college || user?.email?.endsWith("iiests.ac.in") ? "IIEST Shibpur" : "",
            dept: user?.dept,
            passout_year: user?.passout_year,
            position: null,
        });
        setImageFile({
            uid: "-1",
            url: user?.image,
            status: "done",
            name: "default",
        });
    }, [user]);

    const handleImagePreview = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setImageFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData({ ...userData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const onFinish = async () => {
        try {
            setLoading(true);
            console.log(userData);

            const imageURL = await handleSubmitImage();
            console.log("IMAGE Received: " + imageURL);

            var changed = 0;
            const newData = {
                name: userData.name,
                phone: userData.phone,
                email: userData.email,
                image: imageURL,
                passout_year: userData.passout_year,
                dept: userData.dept,
                college: userData.college,
            };

            const toUpdate = [];
            Object.entries(newData).forEach(([key, newValue]) => {
                if (user[key] !== newValue) {
                    formData.append(key, newValue);
                    changed = 1;
                    console.log(key);
                    console.log("new value: ");
                    console.log(newValue);
                    console.log(user[key]);
                    toUpdate.push(key);
                }
            });
            if (changed) {
                formData.append("email", userData.email);
                await updateMember(formData);
                setMessage(`Fields ${toUpdate} updated successfully. Please reload to view changes.`);
                setSeverity("success");
                setMessageTitle("Data Updated!");
                setPopUp(true);
            } else {
                setMessage("No changes found to edit.");
                setSeverity("warning");
                setMessageTitle("No Changes Found");
                setPopUp(true);
            }
        } catch (err) {
            console.log(err);
            const detailed = err?.response?.data?.message;
            setMessage(detailed || err.message);
            setSeverity("error");
            setMessageTitle("Some Error Occured");
            setPopUp(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitImage = async () => {
        // <- This will send the selected image to our api
        try {
            if (imageFile.uid === "-1") {
                console.log(imageFile);
                return imageFile.url;
            }
            const res = await postImage({ image: imageFile });
            console.log("Image needed to be fetched");
            return res.data.data.imageUrl;
        } catch (err) {
            console.log(err);
            const errormsg = err.response ? err.response.data?.message : err.message;
            setMessage(`ERROR: ${errormsg}`);
            setSeverity("error");
            setMessageTitle("Error Submitting Image");
            setPopUp(true);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    if (!user) {
        return (
            <Container maxWidth="md" sx={{ mt: "5rem", color: "#fff !important", display: 'flex', justifyContent: 'center' }}>
                <NoUser />
            </Container>
        );
    }

    return (
        user && (
            <Container maxWidth="md" sx={{ mt: "5rem", color: "#fff !important" }}>
                <Paper sx={{ p: 4, borderRadius: 2, bgcolor: "rgb(17, 23, 29)" }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Profile Dashboard
                    </Typography>

                    <form onSubmit={onFinish}>
                        <Grid2 container spacing={4}>
                            {/* Profile Image with Edit Button */}
                            <Grid2 size={{ xs: 12 }} align="center">
                                <div style={{ position: "relative", display: "inline-block" }}>
                                    <Avatar
                                        src={userData.image}
                                        sx={{ width: 200, height: 200, border: "3px solid var(--accent1)" }}
                                    />
                                    <IconButton
                                        component="label"
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                            backgroundColor: "rgb(17, 23, 29)",
                                            border: "3px solid var(--accent1)",
                                        }}
                                    >
                                        <Edit />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={handleImagePreview}
                                        />
                                    </IconButton>
                                </div>
                            </Grid2>

                            {/* Name */}
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    variant="outlined"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                    required
                                    slotProps={{
                                        input: {
                                            startAdornment: <Person sx={{ mr: 1, color: "action.active" }} />,
                                        },
                                    }}
                                />
                            </Grid2>

                            {/* Email */}
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <TextField
                                    disabled
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    type="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    required
                                    slotProps={{
                                        input: {
                                            startAdornment: <Email sx={{ mr: 1, color: "action.active" }} />,
                                        },
                                    }}
                                />
                            </Grid2>

                            {/* Phone */}
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    variant="outlined"
                                    type="tel"
                                    value={userData?.phone}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d{0,10}$/.test(value)) {
                                            // Only allows up to 10 digits
                                            handleInputChange(e);
                                        }
                                    }}
                                    required
                                    slotProps={{
                                        input: {
                                            startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                                        },
                                    }}
                                    error={userData?.phone?.length > 0 && userData?.phone?.length !== 10}
                                    helperText={
                                        userData?.phone?.length > 0 && userData?.phone?.length !== 10
                                            ? "Enter a valid 10-digit phone number"
                                            : ""
                                    }
                                />
                            </Grid2>

                            {/* College */}
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="College"
                                    name="college"
                                    variant="outlined"
                                    value={userData.college}
                                    onChange={handleInputChange}
                                    required
                                    slotProps={{
                                        input: {
                                            startAdornment: <School sx={{ mr: 1, color: "action.active" }} />,
                                        },
                                    }}
                                />
                            </Grid2>

                            {/* Department */}
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Department"
                                    name="dept"
                                    variant="outlined"
                                    value={userData.dept}
                                    onChange={handleInputChange}
                                    required
                                    slotProps={{
                                        input: {
                                            startAdornment: <Engineering sx={{ mr: 1, color: "action.active" }} />,
                                        },
                                    }}
                                />
                            </Grid2>

                            {/* Passout Year */}
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Passout Year"
                                    name="passout_year"
                                    variant="outlined"
                                    type="number"
                                    value={userData.passout_year}
                                    onChange={handleInputChange}
                                    required
                                    slotProps={{
                                        input: {
                                            startAdornment: <CalendarToday sx={{ mr: 1, color: "action.active" }} />,
                                        },
                                    }}
                                />
                            </Grid2>
                        </Grid2>

                        {/* Save Button */}
                        <Grid2 xs={12} align="center" sx={{ mt: 4 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => setDopen(true)}
                                loading={loading}
                                loadingPosition="start"
                                endIcon={<Save />}
                                disabled={userData?.phone?.length !== 10}
                            >
                                Save Changes
                            </Button>
                        </Grid2>
                        <Dialog
                            open={dopen}
                            onClose={() => setDopen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            fullWidth
                        >
                            <DialogTitle id="alert-dialog-title">{"Confirm Updation?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Confirm your profile updation with the given data? You can always re-update this
                                    information anytime!
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="error"
                                    onClick={() => setDopen(false)}
                                    sx={{ bgcolor: "#f44336", color: "#fff" }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={() => {
                                        setDopen(false);
                                        onFinish();
                                    }}
                                    sx={{ bgcolor: "var(--accent1)", color: "#fff" }}
                                    autoFocus
                                >
                                    Okay
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                </Paper>
                <Snackbar
                    open={popup}
                    autoHideDuration={5000}
                    onClose={() => setPopUp(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
                        <AlertTitle>{messageTitle}</AlertTitle>
                        {message}
                    </Alert>
                </Snackbar>
            </Container>
        )
    );
};

export default ProfileDashboard;
