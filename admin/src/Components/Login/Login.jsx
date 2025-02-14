import { Form, Input, Button, Card, Typography } from "antd";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
// import LoginGoogle from "../LoginGoogle/LoginGoogle";


const Login = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log("Success:", values);
        setUser(values.username)
        if(values.username==='rebeca')navigate('/dashboard')
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
                <Form name="login" onFinish={onFinish}>
                    <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                        <Input style={{ height: "3rem" }} placeholder="Username" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                        <Input.Password style={{ height: "3rem" }} placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
