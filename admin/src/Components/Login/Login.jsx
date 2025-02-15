import { Form, Input, Button, Card, Typography } from "antd";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import LoginGoogle from "../LoginGoogle/LoginGoogle";
import { useEffect, useState } from "react";
// import LoginGoogle from "../LoginGoogle/LoginGoogle";
import { checkStatus } from "../../api";
import { Alert, Flex, Spin } from 'antd';
import LoadingPage from "../LoadingPage/LoadingPage";

const Login = () => {
    const { admin, handleLogin } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const isLoggedIn = async () => {
        try {
            setLoading(()=>true)
            const res = await checkStatus();
            if (!res.data.admin) {
                console.log(res.data);
                
                return
            };
            console.log(res?.data?.message);
            handleLogin(res?.data?.admin);
            navigate("/dashboard");
        } catch (err) {
            console.log("status check fail");
            console.log(err.message);
        } finally {
            setLoading(()=>false);
        }
    };

    useEffect(() => {
        if (admin) navigate('/dashboard')
    }, [])

    useEffect(() => {
        isLoggedIn();
    }, []);

    if(loading) return <LoadingPage />

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
