import * as React from "react";
import { Chip, Typography, CardContent, Card, Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { Event } from "@mui/icons-material";

export default function RoundCard({ name, start, end, venue, i }) {
    return (
        <div sx={{ width: 280 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom sx={{ color: "#4dabf5", fontSize: 14, my: 0 }}>
                        {`Round ${i + 1}`}
                    </Typography>{" "}
                    <Typography fontSize={24} fontWeight={800}>
                        {name}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography gutterBottom sx={{ color: "#4dabf5", fontSize: 14, my: 0 }}>
                            Starting from
                        </Typography>
                        <div style={{fontSize: '1.1rem', color: '#bdbdbd', border: '1px solid #424242', backgroundColor: '#121212', padding: '0.2rem 0.5rem', borderRadius: '5px', marginBottom: '0.5rem', width: 'max-content'}}>{start}</div>
                    </Box>
                    <Box>
                        <Typography gutterBottom sx={{ color: "#4dabf5", fontSize: 14, my: 0 }}>
                            Ending at
                        </Typography>
                        <div style={{fontSize: '1.1rem', color: '#bdbdbd', border: '1px solid #424242', backgroundColor: '#121212', padding: '0.2rem 0.5rem', borderRadius: '5px', marginBottom: '0.5rem', width: 'max-content'}}>{end}</div>
                    </Box>
                    <Box>
                        <Typography gutterBottom sx={{ color: "#4dabf5", fontSize: 14, my: 0 }}>
                            Venue
                        </Typography>
                        <div style={{fontSize: '1.1rem', color: '#bdbdbd', border: '1px solid #424242', backgroundColor: '#121212', padding: '0.2rem 0.5rem', borderRadius: '5px', marginBottom: '0.5rem', width: 'max-content'}}>{venue}</div>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}
