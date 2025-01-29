import React, { useState, useEffect } from "react";
import { Form, Input, Select, Upload, Button, Avatar, Typography, Space, message, Modal } from "antd";
import { UploadOutlined, DeleteOutlined, DeleteFilled } from "@ant-design/icons";
import { getAllMembers, updateMember, postImage } from "../../api";
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
    const [index, setIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [origFile, setOrigFile] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)

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
            message.error(`ERROR: ${errormsg}`);
        }
    };

    const onFinish = async (formValues) => {
        try {
            setLoading(true);
            const formData = new FormData();
            var changed = 0;
            if (index === -1) {
                message.error("No User Selected");
                return;
            }

            const oldData = values[index].original;
            formData.append("_id", oldData._id);
            if (oldData.name !== formValues.name) {
                changed = 1;
                formData.append("name", formValues.name);
            }
            if (JSON.stringify(fileList) !== JSON.stringify(origFile)) {
                console.log("Files data");

                console.log(fileList);
                console.log(origFile);

                const imageURL = await handleEditImage();
                console.log(imageURL);

                formData.append("image", imageURL);
                changed = 1;
            }
            if (oldData.role !== formValues.role) {
                formData.append("role", formValues.role);
                changed = 1;
            }
            if (oldData.team !== formValues.team) {
                formData.append("team", formValues.team);
                changed = 1;
            }

            // post this in mongodb
            if (changed) {
                const res = await updateMember(formData);
                console.log(res);
                if (res.data.message === "success") {
                    message.success("Data updated successfully");
                    await getValues();
                } else message.error(res.data.message);
            } else {
                message.info("No changes found");
            }
        } catch (err) {
            console.log(err);
            message.error(err.message);
        } finally {
            setLoading(false);
            setIsModalOpen(false)
        }
    };

    const onMemberSelect = (idx) => {
        console.log(`selected ${idx}`);
        console.log(values[idx]);
        setIndex(idx);

        form.setFieldsValue(values[idx].original);
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
                        <Button type="primary" onClick={() => setIsModalOpen(true)}>
                            Save Changes
                        </Button>
                        <Modal
                            title="Update Data"
                            onOk={() => form.submit()}
                            onCancel={() => setIsModalOpen(false)}
                            confirmLoading={loading}
                            open={isModalOpen}
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
