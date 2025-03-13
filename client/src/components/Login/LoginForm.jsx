import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Dialog } from "@mui/material";
import LoginGoogle from "../LoginGoogle/LoginGoogle";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../AuthContext";
import { authWithGoogle } from "../../services/authApi";

const LoginForm = ({ open, setOpen }) => {
    const { user, handleLogin, handleLogout } = useAuth();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (user) {
            handleClose()
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
                    // border: "1px solid rgb(190, 190, 190)"
                }}
            >
                {/* <GoogleLogin
                    onSuccess={async(credentialResponse) => {
                        const decoded = jwtDecode(credentialResponse?.credential);
                        console.log(decoded);
                        handleLogin({
                            name: decoded?.name,
                            email: decoded?.email,
                            pic: decoded?.picture,
                        });

                        const result = await authWithGoogle(credentialResponse?.credential);
                        console.log("Response from backend: "+result);
                         
                    }}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                /> */}
                <LoginGoogle />
                {user && <Typography variant="body2" color={"greenyellow"} >Successfully logged in as {user.name}</Typography>}
            </Box>
        </Dialog>
    );
};

export default LoginForm;
