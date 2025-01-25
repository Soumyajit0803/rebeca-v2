import React, { useState } from "react";
import { Tabs, ConfigProvider, theme, Typography } from "antd";
import EventRegistration from "../Components/EventAddition/EventAddition";
import MemberAddition from "../Components/MemberAddition/MemberAddition";
import MemberEditing from "../Components/MemberEditing/MemberEditing";
import RegistrationStats from "../Components/RegistrationStats/RegistrationStats";

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
    {
        key: "5",
        label: "Registration Stats",
        children: <RegistrationStats />,
    },
];
const App = () => {
    const [OpSelect, setOpSelect] = useState(1)
    const width = window.innerWidth
    console.log(width);
    
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <div className="app-wrapper">
                <div style={{fontSize: '2.5rem', fontWeight: '600', padding: '2rem'}} >Admin Dashboard</div>
                <Tabs defaultActiveKey="1" items={items} onChange={(e) => setOpSelect(e)} size="large" tabPosition={'top'} style={{padding: '1rem'}}/>
            </div>
        </ConfigProvider>
    );
};
export default App;
