/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { authWithGoogle } from "../../api";
import { useAuth } from "../../AuthContext";
// import {} from "antd"
import GoogleIcon from "../../../public/google-icon.svg"
export default (props) => {
    const { user, handleLogin, handleLogout } = useAuth();

    const responseGoogle = async (authResult) => {
        try {
            if (authResult["code"]) {
                console.log(authResult.code);
                const result = await authWithGoogle(authResult.code);
                handleLogin(result.data.data.user);
                console.log(result);
            } else {
                console.log(authResult);
                throw new Error(authResult);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    return (
        <button
            style={{
                padding: "10px 20px",
                margin: "10px 0px",
                background: "transparent",
                outline: "none",
                border: "1px solid rgb(135, 135, 135)",
                borderRadius: "3px",
                color: "#fff",
				display: "flex",
				alignItems: "center",
				gap: "10px"
            }}
            onClick={googleLogin}
        >
            <img src={GoogleIcon} style = {{
				aspectRatio: "1/1",
				width: "1.5rem",
			}} />
            Sign in with Google
        </button>
    );
};
