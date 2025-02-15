import { Form, Input, Button, Card, Typography } from "antd";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import LoginGoogle from "../LoginGoogle/LoginGoogle";
// import LoginGoogle from "../LoginGoogle/LoginGoogle";

const Login = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log("Success:", values);
        setUser(values.username);
        if (values.username === "rebeca") navigate("/dashboard");
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <div
                style={{
                    color: "#fff",
                    fontSize: "2rem",
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
                        fontSize: "3rem",
                        fontWeight: "bold",
                    }}
                >
                    Rebeca
                </span>{" "}
                Admin
            </div>
            <Card title="Login" bordered={false} style={{ width: "min(90%, 30rem)", marginTop: "2rem" }}>
                <LoginGoogle />
            </Card>
        </div>
    );
};

export default Login;
