import React, { useState } from "react";
import { Form, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

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
        <div style={{ maxWidth: 1200, padding: "1rem 2rem 2rem 0rem", minHeight: "100vh" }}>
            Find the Team member
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
            <h1>Edit Team Member</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ color: "#e6e6e6" }}
                size="large"
                
            >
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

                        gap: "1rem",
                    }}
                >
                    {/* Role */}
                    <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please select a role" }]}>
                        <Select placeholder="Select a role">
                            <Option value="developer">Developer</Option>
                            <Option value="designer">Designer</Option>
                            <Option value="tester">Tester</Option>
                            <Option value="manager">Manager</Option>
                        </Select>
                    </Form.Item>
                    {/* Team Name */}
                    <Form.Item
                        label="Team Name"
                        name="teamName"
                        rules={[{ required: true, message: "Please enter the team name" }]}
                    >
                        <Select placeholder="Select Team Name">
                            <Option value="developer">Web Developer</Option>
                            <Option value="designer">Content</Option>
                            <Option value="tester">Design</Option>
                            <Option value="manager">Sponsorship</Option>
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
