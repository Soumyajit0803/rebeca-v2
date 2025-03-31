import { Card, CardContent, Typography, Container, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

const PageNotFoundIcon = () => {
    return (
        <svg style={{marginBottom: '2rem'}} fill="rgb(253, 76, 76)" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M7,3C4.794,3,3,4.794,3,7s1.794,4,4,4s4-1.794,4-4S9.206,3,7,3z M7,9C5.897,9,5,8.103,5,7s0.897-2,2-2s2,0.897,2,2 S8.103,9,7,9z"></path> <path d="M16,3c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S18.206,3,16,3z M16,9c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.897,2,2 S17.103,9,16,9z"></path> <path d="M25,3c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S27.206,3,25,3z M25,9c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.897,2,2 S26.103,9,25,9z"></path> <path d="M0,0v12v2v46h60V14v-2V0H0z M41,53H18c-0.552,0-1-0.447-1-1s0.448-1,1-1h23c0.552,0,1,0.447,1,1S41.552,53,41,53z M22,48 c0-0.553,0.448-1,1-1h13c0.552,0,1,0.447,1,1s-0.448,1-1,1H23C22.448,49,22,48.553,22,48z M30,44c-7.168,0-13-5.832-13-13 s5.832-13,13-13s13,5.832,13,13S37.168,44,30,44z M2,12V2h56v10H2z"></path> <path d="M30,20c-6.065,0-11,4.935-11,11s4.935,11,11,11s11-4.935,11-11S36.065,20,30,20z M35.707,35.293 c0.391,0.391,0.391,1.023,0,1.414C35.512,36.902,35.256,37,35,37s-0.512-0.098-0.707-0.293L30,32.414l-4.293,4.293 C25.512,36.902,25.256,37,25,37s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L28.586,31l-4.293-4.293 c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L30,29.586l4.293-4.293c0.391-0.391,1.023-0.391,1.414,0 s0.391,1.023,0,1.414L31.414,31L35.707,35.293z"></path> </g> </g></svg>
    )
}

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <Container
            sx={{
                // width: "100vw",
                // height: "100vh",
                pt: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card sx={{ width: "min(100%, 400px)", p: 2 }}>
                <CardContent
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "100%",
                        justifyContent: "center",
                    }}
                >
                    <PageNotFoundIcon />
                    <Typography variant="h5">Page Not Found</Typography>
                    <Typography variant="body1" color="grey" sx={{ mb: 2, textAlign: "center" }}>
                        The page you're looking for does not exist. There might be an error in the link.
                    </Typography>
                    <Button onClick={() => navigate("/")} variant="contained" color="primary">
                        Go to Home
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default PageNotFound;
