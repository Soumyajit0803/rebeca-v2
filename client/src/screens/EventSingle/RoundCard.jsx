import * as React from "react";
import { Typography, Box, Paper, Tooltip } from "@mui/material";

export default function RoundCard({ name, start, end, venue, i, hideHeading }) {
    return (
        <div className="round-card">
            <Box variant="outlined" sx={{ position: "relative", zIndex: 1 }}>
                {!hideHeading && (
                    <Paper
                        sx={{
                            p: 1,
                            position: "absolute",
                            top: "-4rem",
                        }}
                        elevation={5}
                    >
                        <Typography gutterBottom sx={{ color: "#4dabf5", fontSize: 14, my: 0 }}>
                            {`Round ${i + 1}`}
                        </Typography>{" "}
                        <Tooltip title={name}>
                            <Typography fontSize={24} fontWeight={800} lineHeight={1}>
                                {name.slice(0, 12) + (name.length > 12 ? "..." : "")}
                            </Typography>
                        </Tooltip>
                    </Paper>
                )}
                <Box sx={{ mt: 2 }}>
                    <Typography gutterBottom sx={{ color: "#4dabf5", fontSize: 14, my: 0 }}>
                        Starting from
                    </Typography>
                    <div style={{ marginBottom: "0.5rem" }}>{start}</div>
                </Box>
                <Box>
                    <Typography gutterBottom sx={{ color: "#4dabf5", fontSize: 14, my: 0 }}>
                        Ending at
                    </Typography>
                    <div style={{ marginBottom: "0.5rem" }}>{end}</div>
                </Box>
                <Box>
                    <Typography gutterBottom sx={{ color: "#4dabf5", fontSize: 14, my: 0 }}>
                        Venue
                    </Typography>
                    <div style={{ marginBottom: "0.5rem" }}>{venue}</div>
                </Box>
            </Box>
        </div>
    );
}
