import React, { useState, useEffect } from "react";
import {
    Form,
    Input,
    DatePicker,
    Upload,
    Button,
    Space,
    Avatar,
    InputNumber,
    Select,
    message,
    Modal,
    Tag,
    Card,
    Alert,
} from "antd";
import {
    CloseCircleOutlined,
    CloseOutlined,
    CloseSquareFilled,
    CloseSquareOutlined,
    MinusCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../AuthContext";
// import axios from "axios";
import "./EventAddition.css";
import { getAllMembers, createEvent, postImage } from "../../api";

import ImgCrop from "antd-img-crop";
import Coordinator from "../Coordinator/Coordinator";
import RupeeFilled from "../RupeeFilled/RupeeFilled";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const HybridLabel = ({ name, imageURL }) => {
    return (
        <Space>
            <Avatar src={imageURL} alt={name} style={{ width: 32, height: 32 }} />
            <div>{name}</div>
        </Space>
    );
};

const EventRegistration = ({ errorPop, successPop, infoPop }) => {
    const [form] = Form.useForm();
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [eventType, setEventType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allMembers, setAllMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [coordsList, setCoordsList] = useState([]);
    const [posterList, setPosterList] = useState([]);
    const [thumbnailList, setThumbnailList] = useState([]);
    const [QRList, setQRList] = useState([]);
    const { admin } = useAuth();
    const onPosterChange = ({ fileList: newFileList }) => {
        setPosterList(newFileList);
    };
    const onThumbnailChange = ({ fileList: newFileList }) => {
        setThumbnailList(newFileList);
    };
    const onQRChange = ({ fileList: newFileList }) => {
        setQRList(newFileList);
    };
    const onPosterPreview = async (file) => {
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
    const onThumbnailPreview = async (file) => {
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
    const onQRPreview = async (file) => {
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

    const { user } = useAuth();

    const onFinish = async (values) => {
        // return;

        try {
            setLoading(true);
            console.log("What is going to be added in eventdata");

            if (values.rounds.length === 0) {
                infoPop("Please add Event Rounds details");
                return;
            }
            let i = 1;
            for (let round of values.rounds) {
                round.startTime = round.date[0].$d;
                round.endTime = round.date[1].$d;
                round.roundno = i++;
            }
            console.log(values);
            if (posterList.length === 0) {
                infoPop("Please add poster image");
                return;
            }
            if (thumbnailList.length === 0) {
                infoPop("Please add thumbnail image");
                return;
            }
            if (QRList.length === 0 && values.registrationFee !== 0) {
                infoPop("Please add Payment QR Code");
                return;
            }
            const posterURL = await handleSubmitImage(posterList[0].originFileObj);
            const thumbnailURL = await handleSubmitImage(thumbnailList[0].originFileObj);
            const QRURL = values.registrationFee !== 0 ? await handleSubmitImage(QRList[0].originFileObj) : "";
            const formData = new FormData();

            formData.append("eventName", values.name);
            formData.append("description", values.description);
            formData.append("rulesDocURL", values.rulesDocUrl);
            formData.append("type", values.type);
            if (values.type !== "single") {
                formData.append("maxTeamSize", values.maxTeamSize);
                formData.append("minTeamSize", values.minTeamSize);
            }
            formData.append("poster", posterURL);
            formData.append("thumbnail", thumbnailURL);
            formData.append("paymentQR", QRURL);
            formData.append("assets", values.assets);
            formData.append("registrationFee", values.registrationFee);
            formData.append("rounds", JSON.stringify(values.rounds));
            formData.append("mainCoordinators", JSON.stringify(coordsList.map((e) => allMembers[e].original._id)));
            console.log(formData);

            const res = await createEvent(formData);
            console.log(res);
            successPop("Event Added successfully.");
        } catch (err) {
            console.log(err);
            const detailed = err.response?.data?.message;
            errorPop(detailed || err.message);
        } finally {
            setLoading(false);
            setIsSubmitModalOpen(false);
        }
    };

    const handleGetAllMembers = async () => {
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
                if (member._id === admin._id) {
                    setCoordsList([index]);
                }
            });
            setAllMembers(tmp);
            // console.log(tmp);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmitImage = async (imageFile) => {
        // <- This will send the selected image to our api
        try {
            const res = await postImage({ image: imageFile });
            console.log(res.data.data.imageUrl);
            return res.data.data.imageUrl;
        } catch (err) {
            console.log(err);
            const errormsg = err.response ? err.response.data.message : err.message;
            errorPop(`ERROR: ${errormsg}`);
        }
    };

    // console.log(coordsList.map((e) => allMembers[e]));
    useEffect(() => {
        handleGetAllMembers();
    }, []);

    return (
        <div style={{ maxWidth: 1200 }}>
            <div className="register-container">
                <h1>Event Addition</h1>
                <Form form={form} layout="vertical" onFinish={onFinish} size="large">
                    {/* Name */}
                    <Form.Item
                        label="Event Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the event name",
                            },
                        ]}
                    >
                        <Input placeholder="Enter event name" />
                    </Form.Item>

                    {/* Description */}
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Please enter a description",
                            },
                        ]}
                    >
                        <TextArea rows={4} placeholder="Enter event description" />
                    </Form.Item>
                    <Form.Item
                        label="Rules Document URL"
                        name="rulesDocUrl"
                        rules={[
                            {
                                required: true,
                                type: "url",
                                message: "Please enter a valid URL for the rules document",
                            },
                        ]}
                    >
                        <Input placeholder="Enter URL" />
                    </Form.Item>

                    {/* Poster Image */}
                    <span>
                        <div className="mandatory-star">*</div>Poster and Thumbnail image for the Event
                    </span>
                    <Alert
                        message="Thumbnail is any image which represents the event. It can be a gallery image also."
                        type="info"
                        showIcon
                        style={{ marginTop: "0.5rem" }}
                    />
                    <div className="images-section">
                        <ImgCrop rotationSlider>
                            <Upload
                                maxCount={1}
                                listType="picture-card"
                                fileList={posterList}
                                onChange={onPosterChange}
                                onPreview={onPosterPreview}
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
                                {posterList.length < 1 && "+ Poster"}
                            </Upload>
                        </ImgCrop>

                        {/* Gallery Images */}
                        <ImgCrop rotationSlider>
                            <Upload
                                maxCount={1}
                                listType="picture-card"
                                fileList={thumbnailList}
                                onChange={onThumbnailChange}
                                onPreview={onThumbnailPreview}
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
                                {thumbnailList.length < 1 && "+ Thumbnail"}
                            </Upload>
                        </ImgCrop>
                    </div>
                    <div style={{margin: '1rem 0'}}>
                        <span>Payment QR Code for the event (if it has a registration fees)</span>
                        <ImgCrop rotationSlider>
                            <Upload
                                maxCount={1}
                                listType="picture-card"
                                fileList={QRList}
                                onChange={onQRChange}
                                onPreview={onQRPreview}
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
                                {QRList.length < 1 && "+ Payment QR"}
                            </Upload>
                        </ImgCrop>
                    </div>
                    <Form.Item
                        name="type"
                        label="Event type"
                        rules={[
                            {
                                required: true,
                                message: "Please select an event type!",
                            },
                        ]}
                    >
                        <Select placeholder="Select an option" onChange={(e) => setEventType(e)}>
                            <Option value="single">Single</Option>
                            <Option value="team">Team</Option>
                        </Select>
                    </Form.Item>
                    {eventType !== "single" && (
                        <div
                            style={{
                                display: "flex",
                                JustifyContent: "center",
                                alignItems: "left",
                                gap: "1rem",
                            }}
                        >
                            <Form.Item
                                name="minTeamSize"
                                label="Min team size"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter minimum team size!",
                                        type: "integer",
                                    },
                                    () => ({
                                        validator(_, value) {
                                            const maxNum = form.getFieldValue("maxTeamSize");
                                            if (
                                                value === undefined ||
                                                maxNum === undefined ||
                                                (value <= maxNum && value >= 1)
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error("Minimum team size must be positive or <= maximum team size")
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <InputNumber placeholder="Enter Minimum team size" style={{ width: "100%" }} />
                            </Form.Item>

                            <Form.Item
                                name="maxTeamSize"
                                label="Max team size"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter the maximum team size!",
                                        type: "number",
                                    },
                                    () => ({
                                        validator(_, value) {
                                            const minNum = form.getFieldValue("minTeamSize");
                                            if (
                                                value === undefined ||
                                                minNum === undefined ||
                                                (value >= minNum && value >= 0)
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    "Maximum team size must be positive or >= the minimum team size!"
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <InputNumber style={{ width: "100%" }} placeholder="Enter maximum number" />
                            </Form.Item>
                            {/* Submit Button */}
                        </div>
                    )}
                    <Form.Item
                        name="registrationFee"
                        label="Registration Fee for Non-IIESTians (give 0 if not applicable)"
                        rules={[
                            {
                                required: true,
                                message: "Please provide event fee details",
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: "Please enter a valid amount",
                            },
                        ]}
                    >
                        <InputNumber
                            addonBefore={<RupeeFilled />}
                            placeholder="Enter Registration Fee"
                            type="number"
                            min={0}
                        />
                    </Form.Item>

                    <div>
                        <Form.Item name="coordinators" label="Coordinators for the Event">
                            <Alert
                                // message="Note"
                                message="If you cannot find a member you have just added in the dropdown, consider refreshing the page."
                                type="info"
                                showIcon
                                style={{ margin: "0 0 0.5rem 0" }}
                            />
                            <Alert
                                // message="Note"
                                message="Ensure you are in the coordinators list to make this event visible to you after you save it."
                                type="warning"
                                showIcon
                                style={{ margin: "0 0 0.5rem 0" }}
                            />
                            <Select
                                size="large"
                                style={{ width: "100%" }}
                                showSearch
                                placeholder="Select a Coordinator"
                                optionFilterProp="searchField"
                                onChange={(idx) => {
                                    !coordsList.includes(idx) && setCoordsList([...coordsList, idx]);
                                    setSelectedMember(" ");
                                }}
                                options={allMembers}
                                value={selectedMember}
                            ></Select>
                        </Form.Item>

                        <Space wrap style={{ marginBottom: "1rem" }}>
                            {coordsList.map((coord, i) => {
                                const idx = coord;
                                coord = allMembers[coord].original;
                                return (
                                    <Coordinator
                                        onClose={() => setCoordsList(coordsList.filter((m) => m !== idx))}
                                        name={coord.name}
                                        image={coord.image}
                                        email={coord.email}
                                        id={i}
                                        key={i}
                                    />
                                );
                            })}
                        </Space>
                    </div>
                    <Form.Item
                        label="Describe the assets requirement(if any) to be uploaded by the participants as a part of the event's registration process. Please keep it BLANK if it is not applicable for your event."
                        name="assets"
                    >
                        <Input placeholder="Describe Asset Requirements for participation" />
                    </Form.Item>

                    {/* Rounds Information */}
                    <div className="mandatory-star">*</div>
                    <span style={{ fontFamily: "Poppins" }}>Add Event Rounds Information</span>
                    <Form.List name="rounds">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Card
                                        size="small"
                                        style={{ marginBottom: "1rem" }}
                                        title={`Round - ${name + 1}`}
                                        key={key}
                                        extra={
                                            <CloseOutlined
                                                onClick={() => {
                                                    remove(name);
                                                }}
                                            />
                                        }
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, "roundname"]}
                                            rules={[{ required: true, message: "Round Name is required" }]}
                                        >
                                            <Input placeholder="Round Name" />
                                        </Form.Item>

                                        <Form.Item {...restField} name={[name, "description"]}>
                                            <Input.TextArea placeholder="Description (Optional)" />
                                        </Form.Item>

                                        {/* Start Time and End Time */}
                                        <Form.Item
                                            {...restField}
                                            name={[name, "date"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please select start and end time",
                                                },
                                            ]}
                                        >
                                            <RangePicker showTime />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, "venue"]}
                                            rules={[{ required: true, message: "Venue is required" }]}
                                        >
                                            <Input placeholder="Venue" />
                                        </Form.Item>
                                    </Card>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                        Add Round
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <Form.Item>
                            <Button size="large" type="primary" onClick={() => setIsSubmitModalOpen(true)}>
                                Register Event
                            </Button>
                            <Modal
                                title="Add Event Data"
                                onOk={() => form.submit()}
                                onCancel={() => setIsSubmitModalOpen(false)}
                                confirmLoading={loading}
                                open={isSubmitModalOpen}
                                okText="Yes"
                                cancelText="Cancel"
                            >
                                Add this event to the database?
                            </Modal>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                htmlType="button"
                                onClick={() => {
                                    form.resetFields();
                                    setCoordsList([]);
                                }}
                            >
                                Clear All
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default EventRegistration;
