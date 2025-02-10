import React, { useState } from "react";
import { Tabs, message } from "antd";
import EventRegistration from "../EventAddition/EventAddition";
import MemberAddition from "../MemberAddition/MemberAddition";
import MemberEditing from "../MemberEditing/MemberEditing";
import RegistrationStats from "../RegistrationStats/RegistrationStats";
import EventEditing from "../EventEditing/EventEditing";

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
                <div style={{ fontSize: "2.5rem", fontWeight: "600", padding: "2rem", color: "#fff" }}>
                    Admin Dashboard
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
