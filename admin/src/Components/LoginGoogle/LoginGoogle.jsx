/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { authWithGoogle } from "../../api";
import { useAuth } from "../../AuthContext";
// import {} from "antd"
import {GoogleOutlined} from "@ant-design/icons";
import GoogleIcon from "../../../public/google-icon.svg"
import { Button } from "antd";
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
        <Button
            size="large"
            type="primary"
            icon={<GoogleOutlined />}
            onClick={googleLogin}
        >
            Sign in with Google
        </Button>
    );
};
