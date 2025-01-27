import React, { useState } from "react";
import { Tabs, ConfigProvider, theme, message } from "antd";
import EventRegistration from "./Components/EventAddition/EventAddition";
import MemberAddition from "./Components/MemberAddition/MemberAddition";
import MemberEditing from "./Components/MemberEditing/MemberEditing";
import RegistrationStats from "./Components/RegistrationStats/RegistrationStats";
import EventEditing from "./Components/EventEditing/EventEditing";

const App = () => {
    const [OpSelect, setOpSelect] = useState(1);
    const width = window.innerWidth;
    console.log(width);
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
            content: e
        });
    };
    const items = [
        {
            key: "1",
            label: "Add Event",
            children: <EventRegistration />,
        },
        {
            key: "2",
            label: "Edit Event",
            children: <EventEditing />,
        },
        {
            key: "3",
            label: "Add Team member",
            children: <MemberAddition />,
        },
        {
            key: "4",
            label: "Edit Team member",
            children: <MemberEditing />,
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
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            {contextHolder}
            <div className="app-wrapper">
                <div style={{ fontSize: "2.5rem", fontWeight: "600", padding: "2rem", color: '#fff' }}>Admin Dashboard</div>
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    onChange={(e) => setOpSelect(e)}
                    size="large"
                    tabPosition={"top"}
                    style={{ padding: "1rem" }}
                />
            </div>
        </ConfigProvider>
    );
};
export default App;
