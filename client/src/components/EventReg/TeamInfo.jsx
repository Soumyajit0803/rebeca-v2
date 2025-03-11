import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Autocomplete, TextField, Chip, Grid2, Alert, AlertTitle, Avatar } from "@mui/material";
import { Person, Email, Phone, School, Work, PersonAdd } from "@mui/icons-material";
import { getAllMembers } from "../../services/api";

const ChipLabel = ({name, src}) => {
    return (
        <Chip avatar={<Avatar alt={name} src={src} />} label={name} variant="outlined" />
    );
};

const TeamInfo = ({ setValid, user, selectedItems, setSelectedItems }) => {

    const [dropdown, setDropDown] = useState([]);

    const handleChange = (event, value) => {
        // Limit the selection to at most 3 items
        if (value.length <= 3) {
            setSelectedItems(value);
        }
        setValid(value.length !== 0);
    };

    useEffect(() => {
        async function handleGetAllMembers() {
            try {
                const res = await getAllMembers();
                const options = res.data.data;
                setDropDown(options.filter((e) => e.email !== user?.email))
            } catch (err) {
                console.log(err);
            }
        }
        handleGetAllMembers();
    }, [user]);

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

                    {/* Name */}
                    <Grid2 container spacing={2} alignItems="center" sx={{ marginBottom: 1 }}>
                        <Grid2>
                            <Person color="primary" />
                        </Grid2>
                        <Grid2>
                            <Typography variant="body1">
                                <strong>Name:</strong> {user.name}
                            </Typography>
                        </Grid2>
                    </Grid2>

                    {/* Email */}
                    <Grid2 container spacing={2} alignItems="center" sx={{ marginBottom: 1 }}>
                        <Grid2>
                            <Email color="primary" />
                        </Grid2>
                        <Grid2>
                            <Typography variant="body1">
                                <strong>Email:</strong> {user.email}
                            </Typography>
                        </Grid2>
                    </Grid2>

                    {/* Phone */}
                    <Grid2 container spacing={2} alignItems="center" sx={{ marginBottom: 1 }}>
                        <Grid2>
                            <Phone color="primary" />
                        </Grid2>
                        <Grid2>
                            <Typography variant="body1">
                                <strong>Phone:</strong> +91 {user.phone}
                            </Typography>
                        </Grid2>
                    </Grid2>

                    {/* College */}
                    <Grid2 container spacing={2} alignItems="center" sx={{ marginBottom: 1 }}>
                        <Grid2>
                            <School color="primary" />
                        </Grid2>
                        <Grid2>
                            <Typography variant="body1">
                                <strong>College:</strong> {user.college}
                            </Typography>
                        </Grid2>
                    </Grid2>

                    {/* Department */}
                    <Grid2 container spacing={2} alignItems="center" sx={{ marginBottom: 1 }}>
                        <Grid2>
                            <Work color="primary" />
                        </Grid2>
                        <Grid2>
                            <Typography variant="body1">
                                <strong>Department:</strong> {user.dept}
                            </Typography>
                        </Grid2>
                    </Grid2>

                    {/* Dropdown with Search */}
                    <Typography variant="subtitle1" sx={{ marginBottom: 1, fontWeight: "bold" }}>
                        Select Your Team Members (Max 3):
                    </Typography>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        <AlertTitle>How to Find Teammates?</AlertTitle>
                        Find your teammates via their emails. Before adding them to your team, make sure they are ready
                        to join you!
                    </Alert>
                    <Autocomplete
                        multiple
                        options={dropdown}
                        value={selectedItems}
                        onChange={handleChange}
                        getOptionLabel={(option) => option.email}
                        renderOption={(props, option) => (
                            <li {...props} key={option._id}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar
                                  src={option.image}
                                  alt={option.name}
                                  sx={{ w: 32, h: 32, mr: 2}}
                                />
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
                                <Chip key={index} avatar={<Avatar alt={name} src={option.image} />} label={option.name} variant="outlined" {...getTagProps({ index })} sx={{ margin: "4px" }} />
                            ))
                        }
                        sx={{ marginBottom: 1 }}
                    />
                </CardContent>
            </Card>
        )
    );
};

export default TeamInfo;
