import React, { useState } from "react";
import { Tabs, notification } from "antd";
import EventRegistration from "../EventAddition/EventAddition";
import MemberAddition from "../MemberAddition/MemberAddition";
import MemberEditing from "../MemberEditing/MemberEditing";
import RegistrationStats from "../RegistrationStats/RegistrationStats";
import EventEditing from "../EventEditing/EventEditing";

const Dashboard = () => {
    const [OpSelect, setOpSelect] = useState(1);
    const width = window.innerWidth;
    // console.log(width);
    const [notificationApi, contextHolder] = notification.useNotification();
    const infoPop = (e, message = '') => {
        notificationApi.open({
            message: message || "Information",
            type: "info",
            description: e,
            placement: "topRight"
        });
    };
    const errorPop = (e, message = '') => {
        notificationApi.open({
            message: message || "Some Error Occured",
            type: "error",
            description: e,
            placement: "topRight"
        });
    };
    const successPop = (e, message = '') => {
        notificationApi.open({
            message: message || "Congratulations",
            type: "success",
            description: e,
            placement: "topRight"
        });
    };
    const items = [
        {
            key: "1",
            label: "Add Event",
            children: (
                <EventRegistration
                    errorPop={errorPop}
                    successPop={successPop}
                    infoPop={infoPop}
                />
            ),
        },
        {
            key: "2",
            label: "Edit Event",
            children: (
                <EventEditing errorPop={errorPop} successPop={successPop} infoPop={infoPop} />
            ),
        },
        {
            key: "3",
            label: "Add member",
            children: (
                <MemberAddition errorPop={errorPop} successPop={successPop} infoPop={infoPop} />
            ),
        },
        {
            key: "4",
            label: "Edit member",
            children: (
                <MemberEditing errorPop={errorPop} successPop={successPop} infoPop={infoPop} />
            ),
        },
        {
            key: "5",
            label: "Registration Stats",
            children: (
                <RegistrationStats
                    errorPop={errorPop}
                    successPop={successPop}
                    infoPop={infoPop}
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
