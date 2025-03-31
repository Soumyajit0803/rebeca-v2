import * as React from "react";
import { Typography, Box, Paper } from "@mui/material";

export default function RoundCard({ name, start, end, venue, i }) {
    return (
        <div className="round-card">
            <Box variant="outlined" sx={{ position: "relative", zIndex: 1 }}>
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
                    <Typography fontSize={24} fontWeight={800} lineHeight={1}>
                        {name}
                    </Typography>
                </Paper>
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
