import React, { useState } from "react";
import { Card, CardContent, Typography, Autocomplete, TextField, Chip, Grid2 } from "@mui/material";
import { Person, Email, Phone, School, Work } from "@mui/icons-material";

const SingleUserInfo = ({setValid, user}) => {
    setValid(true);
    return (
        <Card sx={{ margin: "auto", marginTop: 4, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
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
                            <strong>Phone:</strong> {user.phone}
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
            </CardContent>
        </Card>
    );
};

export default SingleUserInfo;
