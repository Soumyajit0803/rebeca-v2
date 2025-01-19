import React from "react";
import { Tabs, ConfigProvider, theme, Typography } from "antd";
import EventRegistration from "../Components/EventAddition/EventAddition";
import MemberAddition from "../Components/MemberAddition/MemberAddition";
import MemberEditing from "../Components/MemberEditing/MemberEditing";
const onChange = (key) => {
    console.log(key);
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
        children: "Content of Tab Pane 2",
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
];
const App = () => {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <div className="app-wrapper">
                <div style={{fontSize: '2.5rem', fontWeight: '600', padding: '2rem'}} >Admin Dashboard</div>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" tabPosition="left" />
            </div>
        </ConfigProvider>
    );
};
export default App;
