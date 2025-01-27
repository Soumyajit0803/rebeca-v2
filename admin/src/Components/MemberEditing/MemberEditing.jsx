import React, { useState } from "react";
import { Form, Input, Select, Upload, Button } from "antd";
import { UploadOutlined, DeleteOutlined, DeleteFilled } from "@ant-design/icons";

const { Option } = Select;
const teamNames = [
    "Secretary General",
    "Finance",
    "Cultural",
    "Resource Information",
    "Travel & Logistics",
    "Sponsorship",
    "Publication",
    "Publicity",
    "Stage Decoration",
    "Business & Alumni Meet",
    "Competitions and Seminars",
    "Web Development",
    "Refreshments",
    "Volunteers",
    "Photography",
    "Joint Secretary",
    "Fixed Signatory",
    "BECA Magazine",
];
const teamRoles = [
    "Head",
    "Associate Head",
    "Associate",
]

const MemberEditing = ({ memberDetails, onUpdate }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Updated Member Details:", values);
        onUpdate(values); // Callback function to handle member updates
    };

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div style={{ maxWidth: 1200, minHeight: "100vh" }}>
            <span style={{ fontSize: "1.3rem", fontWeight: "500" }}>Find the Team member</span>
            <br />
            <Select
                size="large"
                style={{ width: "100%" }}
                showSearch
                placeholder="Select a person"
                optionFilterProp="label"
                onChange={onChange}
                options={[
                    {
                        value: "jack",
                        label: "Jack",
                    },
                    {
                        value: "lucy",
                        label: "Lucy",
                    },
                    {
                        value: "tom",
                        label: "Tom",
                    },
                ]}
            ></Select>
            <Button
                danger
                type="primary"
                size="large"
                style={{ marginTop: "1rem" }}
                icon={<DeleteFilled />}
                iconPosition="end"
            >
                Delete Team Member
            </Button>

            <h1 style={{ marginTop: "2rem" }}>Edit Team Member</h1>
            <Form form={form} layout="vertical" onFinish={onFinish} style={{ color: "#e6e6e6" }} size="large">
                {/* Member Name */}
                <Form.Item
                    label="Member Name"
                    name="memberName"
                    rules={[{ required: true, message: "Please enter the member's name" }]}
                >
                    <Input placeholder="Enter member name" />
                </Form.Item>

                {/* Profile Pic */}
                <Form.Item
                    label="Profile Pic"
                    name="profilePic"
                    valuePropName="file"
                    rules={[{ required: true, message: "Please upload a profile picture" }]}
                >
                    <Upload
                        name="profilePic"
                        listType="picture"
                        beforeUpload={() => false} // Prevent auto-upload
                    >
                        <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
                    </Upload>
                </Form.Item>

                <div
                    style={{
                        display: "flex",
                        flexWrap: 'wrap',
                        gap: "1rem",
                    }}
                >
                    {/* Role */}
                    <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please select a role" }]} style={{width: 200}}>
                        <Select placeholder="Select a role">
                            {teamRoles.map((role, i) => {
                                return (
                                    <Option value={role} key={i}>
                                        {role}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    {/* Team Name */}
                    <Form.Item
                        label="Team Name"
                        name="teamName"
                        rules={[{ required: true, message: "Please enter the team name" }]}
                        style={{width: 300}}
                    >
                        <Select placeholder="Select Team Name">
                            <Select placeholder="Select Team Name">
                                {teamNames.map((team, i) => {
                                    return (
                                        <Option value={team} key={i}>
                                            {team}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Select>
                    </Form.Item>
                </div>
                {/* Submit Button */}
                <div style={{ display: "flex", gap: "1rem" }}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save Changes
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="button" onClick={() => form.resetFields()}>
                            Reset Fields
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default MemberEditing;
