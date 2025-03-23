import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Select, Upload, Button, Avatar, Typography, Space, message, Modal, Alert } from "antd";
import { UploadOutlined, DeleteFilled } from "@ant-design/icons";
import { getAllMembers, updateMember, postImage, deleteMember } from "../../api";
import ImgCrop from "antd-img-crop";
import "antd/es/modal/style";
import "antd/es/slider/style";
import { MailOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { BankOutlined } from '@ant-design/icons';

const { Option } = Select;
const teamNames = [
    "Secretary General",
    "Finance",
    "Cultural",
    "Event",
    "Resource Information",
    "Travel & Logistics",
    "Sponsorship",
    "Publication",
    "Publicity",
    "Stage Decoration",
    "Business & Alumni Meet",
    "Competition and Seminars",
    "Web Development",
    "Refreshments",
    "Volunteers",
    "Photography",
    "Joint Secretary",
    "Fixed Signatory",
    "BECA Magazine",
];
const teamPosition = ["Head", "Associate Head", "Associate"];
const roles = ["developer", "admin", "user"];

const HybridLabel = ({ name, imageURL }) => {
    return (
        <Space>
            <Avatar src={imageURL} alt={name} />
            <div>{name}</div>
        </Space>
    );
};

const MemberEditing = ({ errorPop, successPop, infoPop }) => {
    const [form] = Form.useForm();
    const [values, setValues] = useState([]);
    const [index, setIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [origFile, setOrigFile] = useState([]);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [fetching, setFetching] = useState(false);

    const handleMemberDeletion = async () => {
        try {
            setLoading(true);
            if (index === -1 || !values[index]) {
                errorPop("No Member selected");
                return;
            }
            const oldData = values[index].original;
            console.log(oldData);

            const res = await deleteMember(oldData._id);
            console.log(res);

            if (res.status === 204) {
                successPop("Member deleted successfully");
                await handleGetAllMembers();
                form.resetFields();
                setFileList([]);
                setOrigFile([]);
                setSelectedMember(null);
            } else {
                errorPop(res.data.message);
            }
        } catch (err) {
            errorPop(err.message, "Deletion Failed");
        } finally {
            setLoading(false);
            setIsDeleteModalOpen(false);
        }
    };

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

    const handleEditImage = async () => {
        // <- This will send the selected image to our api
        try {
            const res = await postImage({ image: fileList[0].originFileObj });
            console.log(res.data.data.imageUrl);
            return res.data.data.imageUrl;
        } catch (err) {
            console.log(err);
            const errormsg = err.response ? err.response.data.message : err.message;
            errorPop(`ERROR: ${errormsg}`);
        }
    };

    const onFinish = async (formValues) => {
        try {
            setLoading(true);
            const formData = new FormData();
            const oldData = values[index].original;
            var changed = 0;
            if (index === -1) {
                errorPop("No User Selected");
                return;
            }

            formData.append("_id", oldData._id);
            const newData = {
                name: formValues.name,
                position: formValues.position,
                team: formValues.team,
                phone: `${formValues.phone}`,
                email: formValues.email,
                role: formValues.role,
            };

            // Check for changes and append only modified fields
            Object.entries(newData).forEach(([key, newValue]) => {
                if (oldData[key] !== newValue) {
                    formData.append(key, newValue);
                    changed = 1;
                    console.log("new value: ");
                    console.log(newValue);
                }
            });

            if (JSON.stringify(fileList) !== JSON.stringify(origFile)) {
                console.log("Files data");
                const imageURL = await handleEditImage();
                formData.append("image", imageURL);
                changed = 1;
                // console.log("new value: ");
                console.log("new Image");
            }

            // post this in mongodb
            if (changed) {
                const res = await updateMember(formData);
                console.log(res);
                if (res.data.message === "success") {
                    successPop("Data updated successfully");
                    await handleGetAllMembers();
                    form.resetFields();
                    setFileList([]);
                    setOrigFile([]);
                    setSelectedMember(null);
                } else errorPop(res.data.message);
            } else {
                infoPop("You have not done any changes compared to original data", "No changes Found");
            }
        } catch (err) {
            console.log(err);
            const e = err.data ? err.data.message : err.message;
            errorPop(e);
        } finally {
            setLoading(false);
            setIsSubmitModalOpen(false);
        }
    };

    const onMemberSelect = (idx) => {
        console.log(`selected ${idx}`);
        console.log(values[idx]);
        setIndex(idx);
        setSelectedMember(values[idx]);
        const origValue = values[idx].original;
        origValue.phone = origValue.phone.slice(origValue.phone.length - 10);
        form.setFieldsValue(origValue);
        setFileList([
            {
                uid: "-1",
                url: values[idx].original.image,
                status: "done",
                name: values[idx].original.image.split("/")[-1],
            },
        ]);
        setOrigFile([
            {
                uid: "-1",
                url: values[idx].original.image,
                status: "done",
                name: values[idx].original.image.split("/")[-1],
            },
        ]);
    };

    const handleGetAllMembers = async () => {
        try {
            setFetching(true);
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
            errorPop("Some error occured while fetching all members", "Error fetching members");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        handleGetAllMembers();
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
                value={selectedMember}
                notFoundContent={fetching ? <Spin size="large" tip="fetching members..." /> : null}
            ></Select>
            <br />

            <Alert
                // message="Note"
                message="If you cannot find a member you have just added in the dropdown, consider refreshing the page."
                type="info"
                showIcon
                style={{ marginTop: "1rem" }}
            />
            <Button
                danger
                type="primary"
                size="large"
                style={{ marginTop: "1rem" }}
                icon={<DeleteFilled />}
                iconPosition="end"
                onClick={() => {
                    if (index === -1 || !values[index]) {
                        errorPop("Please select a member first");
                    } else {
                        setIsDeleteModalOpen(true);
                    }
                }}
            >
                Delete Team Member
            </Button>
            <Modal
                title="Delete Data"
                onOk={handleMemberDeletion}
                onCancel={() => setIsDeleteModalOpen(false)}
                confirmLoading={loading}
                open={isDeleteModalOpen}
                okText="Delete"
                okType="danger"
                cancelText="Cancel"
                okButtonProps={{ type: "primary" }}
            >
                Are you sure you want to delete this member's details?
                <br />
                Note that this Operation cannot be reverted.
            </Modal>
            <h1 style={{ marginTop: "2rem" }}>Edit Team Member</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ color: "#e6e6e6" }}
                size="large"
                disabled={!selectedMember}
            >
                {/* Member Name */}
                <Form.Item
                    label="Member Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter the member's name" }]}
                >
                    <Input placeholder="Enter member name" />
                </Form.Item>

                <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please select a role" }]}>
                    <Select placeholder="Select a role">
                        {roles.map((role, i) => {
                            return (
                                <Option value={role} key={i}>
                                    {role[0].toUpperCase() + role.slice(1)}
                                </Option>
                            );
                        })}
                    </Select>
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
                        <Input placeholder="Enter member's email" addonBefore={<MailOutlined />} disabled />
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

                <div style={{ fontFamily: "Poppins", marginBottom: "0.5rem" }}>
                    <div className="mandatory-star">*</div>Profile Image
                </div>
                <ImgCrop rotationSlider showGrid>
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
                        {fileList.length < 1 && (
                            <Space>
                                <UploadOutlined />
                                Upload
                            </Space>
                        )}
                    </Upload>
                </ImgCrop>

                <Form.Item
                    label="College Name"
                    name="college"
                    rules={[
                        { required: true, message: "Please enter your College name" },
                    ]}
                >
                    <Input placeholder="Enter College Name" addonBefore={<BankOutlined />} disabled />
                </Form.Item>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1rem",
                        marginTop: "1rem",
                    }}
                >
                    {/* position */}
                    <Form.Item
                        label="Position"
                        name="position"
                        rules={[{ required: true, message: "Please select a position" }]}
                        style={{ width: 200 }}
                    >
                        <Select placeholder="Select a position">
                            {teamPosition.map((role, i) => {
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
                            title="Update Data"
                            onOk={() => form.submit()}
                            onCancel={() => setIsSubmitModalOpen(false)}
                            confirmLoading={loading}
                            open={isSubmitModalOpen}
                            okText="Yes"
                            cancelText="Cancel"
                        >
                            Are you sure you want to edit this member's details?
                        </Modal>
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
