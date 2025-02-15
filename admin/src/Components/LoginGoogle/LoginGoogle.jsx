/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { authWithGoogle, validatePasskey } from "../../api";
import { useAuth } from "../../AuthContext";
import { Modal, Input, Button, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

export default (props) => {
    const { handleLogin } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passkey, setPasskey] = useState("");
	const [comment, setComment] = useState("")
	const [pwdStatus, setPwdStatus] = useState("");
	const [tempAdmin, setTempAdmin] = useState(null);

    const handlePasskeySubmit = async () => {
        if (!passkey) {
            alert("Passkey is required!");
            return;
        }
        try {
            const passkeyResponse = await validatePasskey(passkey);

            if (passkeyResponse.status === 200) {
                handleLogin(tempAdmin);
                setIsModalOpen(false);
            } else if(passkeyResponse.status === 401){
				setComment("Invalid passkey")
            }
        } catch (err) {
            if(err.status===401){
				setComment("Invalid passkey")
				setPwdStatus("error")
			}
			else setComment(err.message)
        }
    };

    const responseGoogle = async (authResult) => {
        try {
            if (authResult["code"]) {
                console.log(authResult.code);
                const result = await authWithGoogle(authResult.code);
				// handleLogin(result.data.data.admin);
				setTempAdmin(result.data.data.admin)
                if (result.status === 201 || !result.data.data.admin.role) {
                    setIsModalOpen(true); // Open modal for passkey input
                }
                console.log(authResult);
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    return (
        <>
            <Button size="large" type="primary" icon={<GoogleOutlined />} onClick={googleLogin}>
                Sign in with Google
            </Button>
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
					status={pwdStatus}
                />
				<Typography>{comment}</Typography>
            </Modal>
        </>
    );
};
