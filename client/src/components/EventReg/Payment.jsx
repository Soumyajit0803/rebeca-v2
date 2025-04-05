import React, { useState, useEffect } from "react";
import { Button, Container, Card, Paper, Typography, Box, Grid2, Alert, AlertTitle } from "@mui/material";
import rebecaQR from "/assets/paymentqr/rebeca_qr.jpg";
import { Upload } from "@mui/icons-material";
import { useAuth } from "../../AuthContext";

const Payment = ({ eventName, regfee, setValid, setFile, free, paymentQR }) => {
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");
    console.log("Do I need to pay: ")
    console.log(free)

    // Handle file input change
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // Validate file type
            if (selectedFile.type.startsWith("image/")) {
                setValid(true);
                setFile(selectedFile);
                setError("");
                // Create a preview URL for the image
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(selectedFile);
            } else {
                setValid(false);
                setError("Please upload a valid image file (e.g., PNG, JPEG).");
                setFile(null);
                setPreview(null);
            }
        } else {
            setValid(false);
        }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            console.log("File to upload:", file);
            // Here, you can upload the file to your server or handle it as needed
            alert("Screenshot uploaded successfully!");
        } else {
            setError("Please select an image to upload.");
        }
    };

    useEffect(() => {
        if (free) {
            setValid(true);
        }
    }, []);

    return (
        <Card>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Upload Payment Screenshot
                </Typography>
                <Paper elevation={2} sx={{ p: 3, my: 2, borderRadius: 2 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            {!free &&<img src={rebecaQR} style={{ width: "100%", aspectRatio: "1/1", opacity: free?0.3:1 }} />}
                            {free && <Paper elevation={0} sx={{width: '100%', aspectRatio: '1/1'}}></Paper>}
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <Typography sx={{opacity: free?0.3:1}} variant="body1" gutterBottom>
                                As a part of the registration process for the event <bold>{eventName}</bold>, you need
                                to pay Rs.{regfee}. Please complete the payment to complete your Registration.
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Paper>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* File Input */}
                    <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="screenshot-upload"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="screenshot-upload">
                        <Button variant="contained" component="span" fullWidth startIcon={<Upload />} disabled={free}>
                            Select from device
                        </Button>
                    </label>

                    {free && (
                        <Alert color="primary">
                            <AlertTitle>Free Registration!</AlertTitle>
                            {regfee===0?"This event does not require any payment for registration. Go ahead and skip this step!":"IIESTian teams/individuals don't require any fee for taking part in any events in Rebeca. Go ahead, you can skip this step!"}
                        </Alert>
                    )}

                    {/* Preview */}
                    {preview && (
                        <Box sx={{ mt: 2, textAlign: "center" }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Payment Screenshot Preview:
                            </Typography>
                            <img
                                src={preview}
                                alt="Screenshot Preview"
                                style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "4px" }}
                            />
                        </Box>
                    )}

                    {/* Error Message */}
                    {error && (
                        <Typography color="error" align="center">
                            {error}
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Card>
    );
};

export default Payment;
