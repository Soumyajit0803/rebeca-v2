import React, { useState, useEffect } from "react";
import { Form, Input, Select, Upload, Button, Avatar, Typography, Space } from "antd";
import { UploadOutlined, DeleteOutlined, DeleteFilled } from "@ant-design/icons";
import { getAllMembers } from "../../api";
import ImgCrop from "antd-img-crop";

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
const teamRoles = ["Head", "Associate Head", "Associate"];

const HybridLabel = ({ name, imageURL }) => {
    return (
        <Space>
            <Avatar src={imageURL} alt={name} />
            <div>{name}</div>
        </Space>
    );
};

const MemberEditing = ({ memberDetails, onUpdate }) => {
    const [form] = Form.useForm();
    const [values, setValues] = useState([]);

    const [fileList, setFileList] = useState([]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const onFinish = (values) => {
        // console.log("Updated Member Details:", values);
        onUpdate(values); // Callback function to handle member updates
    };

    const onMemberSelect = (idx) => {
        console.log(`selected ${idx}`);
        console.log(values[idx]);

        form.setFieldsValue(values[idx].original);
        setFileList([{
            uid: "-1",
            url: values[idx].original.image,
            status: "done",
            name: values[idx].original.image.split('/')[-1]
        }])
        
    };

    const getValues = async () => {
        try {
            const res = await getAllMembers();
            // console.log(res);
            const tmp = [];
            res.data.data.map((member, index) => {
                tmp.push({
                    value: index,
                    label: <HybridLabel name={member.name} imageURL={member.image} />,
                    searchField: member.name,
                    original: member,
                });
            });
            setValues(tmp);
            // console.log(tmp);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getValues();
    }, []);

    return (
        <div style={{ maxWidth: 1200, minHeight: "100vh" }}>
            <span style={{ fontSize: "1.3rem", fontWeight: "500" }}>Find the Team member</span>
            <br />
            <Select
                size="large"
                style={{ width: "100%" }}
                showSearch
                placeholder="Select a person"
                optionFilterProp="searchField"
                onChange={onMemberSelect}
                options={values}
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
                    name="name"
                    rules={[{ required: true, message: "Please enter the member's name" }]}
                >
                    <Input placeholder="Enter member name" />
                </Form.Item>

                {/* Profile Pic */}
                <div className="mandatory-star">*</div>
                <span style={{ fontFamily: "Poppins" }}>Profile Image</span>
                <ImgCrop rotationSlider>
                    <Upload
                        maxCount={1}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        progress={{
                            strokeColor: {
                                "0%": "#5075f6",
                                "100%": "#705dea",
                            },
                            strokeWidth: 3,
                            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
                        }}
                        // customRequest={() => true}
                    >
                        {fileList.length < 1 && "+ Upload"}
                    </Upload>
                </ImgCrop>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    {/* Role */}
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: "Please select a role" }]}
                        style={{ width: 200 }}
                    >
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
                        name="team"
                        rules={[{ required: true, message: "Please enter the team name" }]}
                        style={{ width: 300 }}
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
