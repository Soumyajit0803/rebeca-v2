import React, { useEffect } from "react";
import { Form, Input, Select, Upload, Button, ConfigProvider, theme } from "antd";
import { createMember, postImage } from "../../api";
import { useState } from "react";
import ImgCrop from "antd-img-crop";
import "./MemberAddition.css";
// import CustomUpload from "./CustomUpload";

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

const MemberAddition = ({messageError, messageSuccess, messageInfo}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [imagePreview, setImagePreview] = useState(""); // <- To
    const [imageFile, setImageFile] = useState({});
    const formData = new FormData();

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

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const imageURL = await handleSubmitImage();
            console.log("IMAGE Received: " + imageURL);

            formData.append("name", values.memberName);
            formData.append("image", imageURL);
            formData.append("role", values.role);
            formData.append("team", values.teamName);
            await createMember(formData);
            messageSuccess("Member added successfully.");
        } catch (err) {
            console.log(err.response.data);
            const detailed = err.response.data.message;
            messageError(detailed || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImagePreview = (e) => {
        // <- This will let you preview the uploaded image
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", (e) => {
                setImagePreview(e.target.result);
            });

            reader.readAsDataURL(file);
        }
    };
    const handleSubmitImage = async () => {
        // <- This will send the selected image to our api
        try {
            const res = await postImage({ image: fileList[0].originFileObj });
            console.log(res.data.data.imageUrl);
            return res.data.data.imageUrl;
        } catch (err) {
            console.log(err);
            const errormsg = err.response ? err.response.data.message : err.message;
            messageError(`ERROR: ${errormsg}`);
        }
    };

    return (
        <div style={{ maxWidth: 1200, minHeight: "100vh" }}>
            <h1>Add Team Member</h1>
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
                {/* <Form.Item
                    label="Profile Pic"
                    name="profilePic"
                    valuePropName="file"
                    rules={[{ required: true, message: "Please upload a profile picture" }]}
                    // onChange={(e) => handleImagePreview(e)}

                > */}
                <div className="mandatory-star">*</div>
                <span style={{ fontFamily: "Poppins" }}>Profile Image</span>
                <ConfigProvider
                    theme={{
                        algorithm: theme.darkAlgorithm,
                    }}
                >
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
                </ConfigProvider>
                {/* <CustomUpload onChange={onChange} onPreview={onPreview} fileList={fileList} /> */}
                {/* </Form.Item> */}

                <div
                    style={{
                        display: "flex",
                        JustifyContent: "center",
                        alignItems: "left",
                        gap: "1rem",
                        flexWrap: "wrap",
                        marginTop: "1rem",
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
                        name="teamName"
                        rules={[{ required: true, message: "Please enter the team name" }]}
                        style={{ width: 300 }}
                    >
                        <Select placeholder="Select Team Name">
                            {teamNames.map((team, i) => {
                                return (
                                    <Option value={team} key={i}>
                                        {team}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </div>
                {/* Submit Button */}
                <div style={{ display: "flex", gap: "1rem" }}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Add Team Member
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="button" onClick={() => form.resetFields()}>
                            Clear All
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default MemberAddition;
