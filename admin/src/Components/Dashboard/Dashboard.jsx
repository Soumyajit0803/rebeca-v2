import React, { useState } from "react";
import { Avatar, Tabs, message, Menu, Typography, Dropdown } from "antd";
import EventRegistration from "../EventAddition/EventAddition";
import MemberAddition from "../MemberAddition/MemberAddition";
import MemberEditing from "../MemberEditing/MemberEditing";
import RegistrationStats from "../RegistrationStats/RegistrationStats";
import EventEditing from "../EventEditing/EventEditing";

const AvatarMenu = ({ user, handleLogout }) => {
    const menuItems = [
        {
            key: "welcome",
            label: (
                <>
                    <Typography.Text strong>{user.name.split(" ")[0]}</Typography.Text>
                    <br />
                    <Typography.Text>Admin</Typography.Text>
                </>
            ),
            disabled: true, // Prevents clickability
        },
        { type: "divider" },
        {
            key: "logout",
            label: "Logout",
            onClick: handleLogout,
        },
    ];

    return (
        <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
            <Avatar src={user.image} alt={user.name} size={50} style={{ cursor: "pointer" }} />
        </Dropdown>
    );
};

const Dashboard = () => {
    const [OpSelect, setOpSelect] = useState(1);
    const width = window.innerWidth;
    // console.log(width);
    const [messageApi, contextHolder] = message.useMessage();
    const messageInfo = (e) => {
        messageApi.open({
            type: "info",
            content: e,
        });
    };
    const messageError = (e) => {
        messageApi.open({
            type: "error",
            content: e,
        });
    };
    const messageSuccess = (e) => {
        messageApi.open({
            type: "success",
            content: e,
        });
    };
    const items = [
        {
            key: "1",
            label: "Add Event",
            children: (
                <EventRegistration
                    messageError={messageError}
                    messageSuccess={messageSuccess}
                    messageInfo={messageInfo}
                />
            ),
        },
        {
            key: "2",
            label: "Edit Event",
            children: (
                <EventEditing messageError={messageError} messageSuccess={messageSuccess} messageInfo={messageInfo} />
            ),
        },
        {
            key: "3",
            label: "Add member",
            children: (
                <MemberAddition messageError={messageError} messageSuccess={messageSuccess} messageInfo={messageInfo} />
            ),
        },
        {
            key: "4",
            label: "Edit member",
            children: (
                <MemberEditing messageError={messageError} messageSuccess={messageSuccess} messageInfo={messageInfo} />
            ),
        },
        {
            key: "5",
            label: "Registration Stats",
            children: (
                <RegistrationStats
                    messageError={messageError}
                    messageSuccess={messageSuccess}
                    messageInfo={messageInfo}
                />
            ),
        },
    ];

    return (
        <>
            {contextHolder}
            <div className="app-wrapper">
                <div
                    className="header"
                    style={{
                        display: "flex",
                        // alignItems: "center",
                        justifyContent: "space-between",
                        padding: "2rem",
                    }}
                >
                    <div style={{ fontSize: "2.5rem", fontWeight: "600", color: "#fff" }}>Admin Dashboard</div>
                    <div
                        className="avatar"
                        style={{
                            width: "60",
                        }}
                    >
                        <AvatarMenu user={{ name: "hello" }} />
                    </div>
                </div>
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    onChange={(e) => setOpSelect(e)}
                    size="large"
                    tabPosition={"top"}
                    style={{ padding: "1rem" }}
                />
            </div>
        </>
    );
};
export default Dashboard;
