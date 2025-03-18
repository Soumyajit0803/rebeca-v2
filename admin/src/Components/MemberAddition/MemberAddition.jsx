import React, { useEffect } from "react";
import { Form, Input, Select, Upload, Button, ConfigProvider, theme, DatePicker, Modal } from "antd";
import { createMember, postImage, updateMember } from "../../api";
import { useState } from "react";
import ImgCrop from "antd-img-crop";
import "./MemberAddition.css";
import { MailOutlined, ReadOutlined } from "@ant-design/icons";
import { useAuth } from "../../AuthContext";
import dayjs from "dayjs";
import { BankOutlined } from '@ant-design/icons';

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
const teamRoles = ["head", "associate head", "associate"];

const MemberAddition = ({ errorPop, successPop, infoPop }) => {
    const { admin, setProfileStatus } = useAuth();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [defValues, setDefValues] = useState({});
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const formData = new FormData();

    const [fileList, setFileList] = useState([
        {
            uid: "-1",
            url: admin.image,
            status: "done",
            name: "default",
        },
    ]);
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
            if(imageURL==='undefined'){
                console.log("Image not here");
                
                throw new Error("Image not selected");
            }

            var changed = 0;
            const newData = {
                name: values.name,
                position: values.position,
                team: values.team,
                phone: values.phone,
                email: values.email,
                image: imageURL,
                passout_year: parseInt(values.passout_year.format("YYYY")),
                dept: values.dept,
                college: values.college
            };

            Object.entries(newData).forEach(([key, newValue]) => {
                if (admin[key] !== newValue) {
                    formData.append(key, newValue);
                    changed = 1;
                    console.log("new value: ");
                    console.log(newValue);
                    console.log(admin[key]);
                }
            });
            if (changed) {
                formData.append("email", values.email);

                console.log(values);

                await updateMember(formData);
                successPop("Profile updated successfully.");
                setProfileStatus(true);
            } else {
                infoPop("You have not done any changes compared to original data", "No changes Found");
            }
        } catch (err) {
            console.log(err);
            const detailed = err?.response?.data?.message;
            errorPop(detailed || err.message);
        } finally {
            setLoading(false);
            setIsSubmitModalOpen(false);
        }
    };

    const handleSubmitImage = async () => {
        // <- This will send the selected image to our api
        try {
            if (fileList[0].uid === "-1"){
                const res = await postImage({image: fileList[0].url});
                console.log("Google image");
                console.log(res);
                return res.data.data.imageUrl;
            }
            const res = await postImage({ image: fileList[0].originFileObj });
            console.log(res.data.data.imageUrl);
            return res.data.data.imageUrl;
        } catch (err) {
            console.log(err);
            const errormsg = err.response ? err.response.data.message : err.message;
            errorPop(`ERROR: ${errormsg}`);
        }
    };

    useEffect(() => {
        const formdef = { ...admin };
        formdef.phone = formdef.phone;
        if (admin.passout_year) formdef.passout_year = dayjs(`${admin.passout_year}`, "YYYY");
        if (admin.email.endsWith("iiests.ac.in")) formdef.college = "IIEST Shibpur";
        setDefValues(formdef);
        form.setFieldsValue(formdef); // Dynamically update form values
    }, [admin]);

    // console.log(fileList[0]);

    return (
        defValues && (
            <div style={{ maxWidth: 1200, minHeight: "100vh" }}>
                <h1>Profile Details</h1>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ color: "#e6e6e6" }}
                    size="large"
                    initialValues={defValues}
                >
                    {/* Member Name */}
                    <Form.Item
                        label="Member Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter the member's name" }]}
                    >
                        <Input placeholder="Enter member name" />
                    </Form.Item>

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
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Please enter the member's email" },
                                { type: "email", message: "Please enter a valid email address" },
                            ]}
                        >
                            <Input disabled placeholder="Enter member's email" addonBefore={<MailOutlined />} />
                        </Form.Item>

                        <Form.Item
                            label="Contact No"
                            name="phone"
                            rules={[
                                { required: true, message: "Please enter the member's Contact Number" },
                                { pattern: /^\d{10}$/, message: "Please enter a valid 10-digit phone number" }, // Example regex for 10-digit number
                            ]}
                        >
                            <Input placeholder="Enter contact details" addonBefore={<span>+91</span>} />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="College Name"
                        name="college"
                        rules={[{ required: true, message: "Please enter your College name" }]}
                    >
                        <Input placeholder="Enter College Name" addonBefore={<BankOutlined />} />
                    </Form.Item>

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

                    {/* Role */}
                    <Form.Item
                        label="Department"
                        name="dept"
                        rules={[{ required: true }]}
                        style={{ width: 500, marginTop: 20 }}
                    >
                        <Input placeholder="Enter Department name" addonBefore={<ReadOutlined />} />
                    </Form.Item>
                    {/* Team Name */}
                    <Form.Item
                        label="Passout year"
                        name="passout_year"
                        rules={[{ required: true, message: "Please enter your passout year, e.g. 2026" }]}
                        style={{ width: 300, cursor: "pointer" }}
                    >
                        <DatePicker picker="year" placeholder="Select Year" />
                    </Form.Item>
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
                            name="position"
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
                            <Button type="primary" onClick={() => setIsSubmitModalOpen(true)}>
                                Save Changes
                            </Button>
                            <Modal
                                title="Update Personal Details"
                                onOk={() => form.submit()}
                                onCancel={() => setIsSubmitModalOpen(false)}
                                confirmLoading={loading}
                                open={isSubmitModalOpen}
                                okText="Confirm Changes"
                                cancelText="Cancel"
                            >
                                Confirm the profile editing details.
                            </Modal>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="button" onClick={() => form.resetFields()}>
                                Clear All
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        )
    );
};

export default MemberAddition;
