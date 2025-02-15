import React from "react";
import { Spin } from "antd";
const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
};
const content = <div style={contentStyle} />;
const LoadingPage = () => (
    <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Spin tip="Loading Dashboard" style={{transform: 'scale(2)'}}>{content}</Spin>
    </div>
);
export default LoadingPage;
