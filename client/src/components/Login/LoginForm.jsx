import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Dialog } from "@mui/material";
import LoginGoogle from "../LoginGoogle/LoginGoogle";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../AuthContext";
import { authWithGoogle } from "../../services/api";

const LoginForm = ({ open, setOpen }) => {
    const { user, handleLogin, handleLogout } = useAuth();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                handleClose();
            }, 1500);
        }
    }, [user]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <Box
                sx={{
                    width: "100%",
                    mx: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: "white",
                    background: "transparent",
                    p: 5,
                }}
            >
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        const decoded = jwtDecode(credentialResponse?.credential);
                        console.log(decoded);
                        console.log(credentialResponse);
                        
                        const result = await authWithGoogle(credentialResponse?.credential)
                        console.log(`auth with google result: ${result}`);
                        

                        handleLogin({
                            name: decoded?.name,
                            email: decoded?.email,
                            pic: decoded?.picture,
                        });
                    }}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                />
                {user && <Typography variant="body2" color={"greenyellow"} >Successfully logged in as {user.name}</Typography>}
            </Box>
        </Dialog>
    );
};

export default LoginForm;
