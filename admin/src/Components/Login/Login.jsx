import { Form, Input, Button, Card, Typography, Tag } from "antd";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import LoginGoogle from "../LoginGoogle/LoginGoogle";
import { useEffect, useState } from "react";
// import LoginGoogle from "../LoginGoogle/LoginGoogle";
import { checkStatus } from "../../api";
import { Alert, Flex, Spin } from "antd";
import LoadingPage from "../LoadingPage/LoadingPage";
import { LogoutOutlined, ExportOutlined, CrownFilled, AlertFilled } from "@ant-design/icons";

const TagPadded = ({ position, color }) => {
    return (
        <Tag icon={<CrownFilled />} color={color}>
            {position}
        </Tag>
    );
};

const Login = () => {
    const { admin, handleLogin } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const isLoggedIn = async () => {
        try {
            setLoading(() => true);
            const res = await checkStatus();
            if (!res.data.user) {
                console.log(res.data);
                return;
            }
            console.log(res?.data?.user);
            if (res?.data?.user?.role !== "user") {
                handleLogin(res?.data?.user);
                navigate("/dashboard");
            }
        } catch (err) {
            console.log("status check fail");
            console.log(err.message);
        } finally {
            setLoading(() => false);
        }
    };

    useEffect(() => {
        if (admin) navigate("/dashboard");
    }, []);

    useEffect(() => {
        isLoggedIn();
    }, []);

    if (loading) return <LoadingPage />;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
            }}
        >
            <Card title="Admin Dashboard" bordered={true} style={{ width: "min(90%, 30rem)" }}>
                <div
                    style={{
                        color: "#fff",
                        fontSize: "1.5rem",
                        lineHeight: "1.3em",
                    }}
                >
                    Welcome to{" "}
                    <span
                        style={{
                            fontWeight: "bold",
                            background: "linear-gradient(120deg,rgb(22, 134, 220),#da36ff",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text !important",
                            color: "transparent",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                        }}
                    >
                        Rebeca
                    </span>{" "}
                    Admin Dashboard
                </div>

                <Card style={{ margin: "1rem 0" }} title="Rules">
                    <ul>
                        <li>
                            Only IIESTian emails allowed beyond this point, so if you hopped in here out of curiosity,
                            please hop out 🙂.
                        </li>
                        <li>
                            For first time login, a person has to enter a <Tag>Passkey</Tag>
                        </li>
                        <li>
                            The <Tag>Passkey</Tag> determines whether the person is a
                            <ul style={{ position: "relative", left: "20px", top: "10px" }}>
                                <li style={{ marginBottom: "0.3em" }}>
                                    <TagPadded position={"Developer"} color="orange" />
                                    Access to Developer Features.
                                </li>
                                <li style={{ marginBottom: "0.3em" }}>
                                    <TagPadded position={"Facilitator"} color="blue" />
                                    Access to specific events data.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </Card>
                <LoginGoogle />
                <Alert
                    // message="Note"
                    message="Portal is freezed from furthur updates. Contact the developers for more info."
                    type="warning"
                    showIcon
                    style={{ margin: "1rem 0" }}
                />
            </Card>
        </div>
    );
};

export default Login;
