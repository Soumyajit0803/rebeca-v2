/* eslint-disable import/no-anonymous-default-export */
import React, {useState} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { authWithGoogle, validatePasskey } from "../../api";
import { useAuth } from "../../AuthContext";
import { Modal, Input, Button } from "antd";
import GoogleIcon from "../../../public/google-icon.svg";

export default (props) => {
    const { user, handleLogin, handleLogout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passkey, setPasskey] = useState("");

    const handlePasskeySubmit = async () => {
        if (!passkey) {
            alert("Passkey is required!");
            return;
        }
        try {
            const passkeyResponse = await validatePasskey(passkey);

            if (passkeyResponse.status === 200) {
                handleLogin(userData);
                setIsModalOpen(false);
            } else {
                alert("Invalid passkey");
            }
        } catch (err) {
            alert("Some error occured: " + err.message);
        }
    };

    const responseGoogle = async (authResult) => {
        try {
            if (authResult["code"]) {
                console.log(authResult.code);
                const result = await authWithGoogle(authResult.code);
                if (result.status === 201) {
                    // New user
                    // setUserData(result.data.data.user);
                    setIsModalOpen(true); // Open modal for passkey input
                } else {
                    handleLogin(result.data.data.user);
                }
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
        <>
            <Modal
                title="Enter Passkey"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handlePasskeySubmit}>
                        Submit
                    </Button>,
                ]}
            >
                <Input.Password
                    placeholder="Enter your passkey"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                />
            </Modal>
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
                    gap: "10px",
                }}
                onClick={googleLogin}
            >
                <img
                    src={GoogleIcon}
                    style={{
                        aspectRatio: "1/1",
                        width: "1.5rem",
                    }}
                />
                Sign in with Google
            </button>
        </>
    );
};
