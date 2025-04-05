import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Autocomplete,
    TextField,
    Chip,
    Grid2,
    Alert,
    AlertTitle,
    Avatar,
} from "@mui/material";
import { Person, Email, Phone, School, Work, Groups } from "@mui/icons-material";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { getAllMembersNotInEvent } from "../../services/eventApi";
const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

const GetData = ({
    setValid,
    user,
    selectedItems,
    setSelectedItems,
    mode,
    teamName,
    setTeamName,
    minSize,
    maxSize,
    eventId,
    assets,
    setAssets,
    isAssetReq,
}) => {
    const [dropdown, setDropDown] = useState([]);
    // console.log("Event ID received: ")
    // console.log(eventId)
    const handleChange = (event, value) => {
        // Limit the selection to at most 3 items
        if (value.length <= maxSize) {
            setSelectedItems(value);
        }
        if (value.length >= minSize && value.length <= maxSize && teamName.length !== 0) setValid(true);
        else setValid(false);
    };

    useEffect(() => {
        if (mode === "single" && !isAssetReq) {
            setValid(true);
        }

        async function handleGetAllMembers() {
            try {
                const res = await getAllMembersNotInEvent(eventId);
                const options = res.data.data;
                setDropDown(options.filter((e) => e.email !== user?.email));
            } catch (err) {
                console.log(err);
            }
        }
        handleGetAllMembers();
    }, [eventId]);

    return (
        user && (
            <Card sx={{ margin: "auto", marginTop: 4, boxShadow: 3 }}>
                <CardContent>
                    <Typography
                        variant="h5"
                        component="div"
                        gutterBottom
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                        User Details
                    </Typography>

                    <Alert severity="warning" sx={{ mb: 2 }} color="primary">
                        <AlertTitle>Cannot Update Your Info ?</AlertTitle>
                        Profile Information details cannot be updated here. However, if you think there is a mistake,
                        please navigate to your profile and do the necessary changes, and come back here.
                    </Alert>
                    {isAssetReq && (
                        <Alert severity="info" sx={{ mb: 2 }} color="info">
                            <AlertTitle>Assets uploading mandatory in this event</AlertTitle>
                            As part of the registration process for this event, you are required to upload certain assets. Please upload your asset(s) to <b><a href="https://drive.google.com" style={{fontWeight: "bold", textDecoration: "underline"}}>Google Drive</a></b>, ensure that the link is set to <b>allow access for everyone</b>, and share the generated link here.
                        </Alert>
                    )}

                    {/* Name */}
                    <Grid2 container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                        <Grid2 size={{ xs: 12 }}>
                            <TextField
                                disabled={user.name}
                                fullWidth
                                label="Name"
                                variant="outlined"
                                value={user.name}
                                slotProps={{
                                    input: {
                                        startAdornment: <Person color="primary" sx={{ mr: 1 }} />,
                                    },
                                }}
                            />
                        </Grid2>
                    </Grid2>

                    {/* Email */}
                    <Grid2 container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                        <Grid2 size={{ xs: 12 }}>
                            <TextField
                                disabled={user.email}
                                fullWidth
                                label="Email"
                                variant="outlined"
                                value={user.email}
                                slotProps={{
                                    input: {
                                        startAdornment: <Email color="primary" sx={{ mr: 1 }} />,
                                    },
                                }}
                            />
                        </Grid2>
                    </Grid2>

                    {/* Phone */}
                    <Grid2 container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                        <Grid2 size={{ xs: 12 }}>
                            <TextField
                                disabled={user.phone}
                                fullWidth
                                label="Phone"
                                variant="outlined"
                                value={user.phone}
                                slotProps={{
                                    input: {
                                        startAdornment: <Phone color="primary" sx={{ mr: 1 }} />,
                                    },
                                }}
                            />
                        </Grid2>
                    </Grid2>

                    {/* College */}
                    <Grid2 container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                        <Grid2 size={{ xs: 12 }}>
                            <TextField
                                disabled={user.college}
                                fullWidth
                                label="College"
                                variant="outlined"
                                value={user.college}
                                slotProps={{
                                    input: {
                                        startAdornment: <School color="primary" sx={{ mr: 1 }} />,
                                    },
                                }}
                            />
                        </Grid2>
                    </Grid2>

                    {/* Department */}
                    <Grid2 container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                        <Grid2 size={{ xs: 12 }}>
                            <TextField
                                disabled={user.dept}
                                fullWidth
                                label="Department"
                                variant="outlined"
                                value={user.dept}
                                slotProps={{
                                    input: {
                                        startAdornment: <Work color="primary" sx={{ mr: 1 }} />,
                                    },
                                }}
                            />
                        </Grid2>
                    </Grid2>

                    {isAssetReq && (
                        <Grid2 container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                            <Typography variant="body1" color="text.secondary" sx={{ mt: 2, p: 1 }}>
                                {isAssetReq}
                            </Typography>
                            <Grid2 size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Assets URL"
                                    variant="outlined"
                                    error={assets !== "" && !urlRegex.test(assets)}
                                    helperText={
                                        assets !== "" && !urlRegex.test(assets)
                                            ? "Enter a valid URL"
                                            : ""
                                    }
                                    slotProps={{
                                        input: {
                                            startAdornment: <InsertLinkIcon color="primary" sx={{ mr: 1 }} />,
                                        },
                                    }}
                                    value={assets}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        setAssets(newValue);
                                        setValid(
                                            newValue !== "" && urlRegex.test(newValue)
                                        );
                                    }}
                                />
                            </Grid2>
                        </Grid2>
                    )}

                    {/* Dropdown with Search */}
                    {mode === "team" && (
                        <>
                            {/* Team Name */}
                            <Grid2 container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                                <Grid2 size={{ xs: 12 }}>
                                    <TextField
                                        disabled={user.teamName}
                                        fullWidth
                                        label="Team Name"
                                        variant="outlined"
                                        slotProps={{
                                            input: {
                                                startAdornment: <Groups color="primary" sx={{ mr: 1 }} />,
                                            },
                                        }}
                                        value={teamName}
                                        onChange={(e) => {
                                            setTeamName(e.target.value);
                                            if (e.target.value !== "" && selectedItems.length !== 0) setValid(true);
                                            else setValid(false);
                                        }}
                                    />
                                </Grid2>
                            </Grid2>
                            <Typography variant="subtitle1" sx={{ marginBottom: 1, fontWeight: "bold" }}>
                                Select Your Team Members (max {maxSize + 1}, min {minSize + 1}):
                            </Typography>
                            <Alert severity="info" sx={{ mb: 2 }}>
                                <AlertTitle>How to Find Teammates?</AlertTitle>
                                Find your teammates via their emails. Before adding them to your team, make sure they
                                are ready to join you!
                            </Alert>
                            <Autocomplete
                                multiple
                                options={dropdown}
                                value={selectedItems}
                                onChange={handleChange}
                                getOptionLabel={(option) => option.email}
                                renderOption={(props, option) => (
                                    <li {...props} key={option._id}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <Avatar src={option.image} alt={option.name} sx={{ w: 32, h: 32, mr: 2 }} />
                                            <div>
                                                <Typography variant="body1">{option.name}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {option.email} • {option.college}
                                                </Typography>
                                            </div>
                                        </div>
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" placeholder="Search and select" />
                                )}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            key={index}
                                            avatar={<Avatar alt={name} src={option.image} />}
                                            label={option.name}
                                            variant="outlined"
                                            {...getTagProps({ index })}
                                            sx={{ margin: "4px" }}
                                        />
                                    ))
                                }
                                sx={{ marginBottom: 1 }}
                            />
                        </>
                    )}
                </CardContent>
            </Card>
        )
    );
};

export default GetData;
