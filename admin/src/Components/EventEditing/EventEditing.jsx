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
    Modal,
    Tag,
    Card,
    Alert,
} from "antd";
import Icon, { DeleteFilled, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useAuth } from "../../AuthContext";
// import axios from "axios";
// import "./EventAddition.css";
import { getAllMembers, getAllEvents, updateEvent, postImage, deleteEvent } from "../../api";
import ImgCrop from "antd-img-crop";
import dayjs from "dayjs";
import Coordinator from "../Coordinator/Coordinator";
import { Spin } from "antd";
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

const EventEditing = ({ errorPop, successPop, infoPop }) => {
    const [AllEventsData, setAllEventsData] = useState([]);
    const [form] = Form.useForm();
    const [eventType, setEventType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allMembers, setAllMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [coordsList, setCoordsList] = useState([]);
    const [posterList, setPosterList] = useState([]);
    const [origposterList, setOrigPosterList] = useState([]);
    const [thumbnailList, setThumbnailList] = useState([]);
    const [origThumbnailList, setOrigThumbnailList] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [fetchingAllEvents, setFetchingAllEvents] = useState(false)
    const [fetchingAllMembers, setFetchingAllMembers] = useState(false);
    const {admin} = useAuth()

    const handleEventDeletion = async () => {
        try {
            setLoading(true);
            if (selectedEvent === null) {
                errorPop("No Event selected", "Please Select an event first");
                return;
            }

            const res = await deleteEvent(selectedEvent.original._id);
            console.log(res);

            if (res.data.message === "success") {
                successPop("Event deleted Successfully", "Event Deleted");
                await handleGetAllEvents();
                form.resetFields();
                setPosterList([])
                setOrigPosterList([])
                setThumbnailList([])
                setOrigThumbnailList([])
                setSelectedEvent(null);
            } else {
                errorPop(res.data.message, "Error While Deleting Event");
            }
        } catch (err) {
            errorPop(err.message, "Error While Deleting Event");
        } finally {
            setLoading(false);
            setIsDeleteModalOpen(false);
        }
    };

    const onPosterChange = ({ fileList: newFileList }) => {
        setPosterList(newFileList);
    };

    const onThumbnailChange = ({ fileList: newFileList }) => {
        setThumbnailList(newFileList);
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

    // const { user } = useAuth();
    const onFinish = async (values) => {
        console.log(values);
        
        try {
            setLoading(true);
            if (posterList.length === 0) {
                infoPop("Please add poster image", "No Poster Image");
                return;
            }
            if (values.rounds.length === 0) {
                infoPop("Please add Round details", "No Round Information");
                return;
            }
            if (thumbnailList.length === 0) {
                infoPop("Please add thumbnail image", "No Thumbnail Image");
                return;
            }

            var skipCoordinators = 0;
            if (coordsList.length===0){
                skipCoordinators = 1;
            }

            const formData = new FormData();
            var changed = 0;
            const oldData = selectedEvent.original;
            formData.append("_id", selectedEvent.original._id);

            if (JSON.stringify(posterList) !== JSON.stringify(origposterList)) {
                changed = 1;
                console.log("Files data");
                const imageURL = await handleEditImage(posterList[0].originFileObj);
                formData.append("poster", imageURL);
            }
            if (JSON.stringify(thumbnailList) !== JSON.stringify(origThumbnailList)) {
                console.log("Files data");
                const imageURL = await handleEditImage(thumbnailList[0].originFileObj);
                formData.append("thumbnail", imageURL);
                changed = 1;
            }
            // console.log(start);
            // console.log(selectedEvent);

            const newData = {
                eventName: values.eventName,
                description: values.description,
                rounds: JSON.stringify(values.rounds),
                rulesDocURL: values.rulesDocURL,
                type: values.type,
                registrationFee: values.registrationFee,
                mainCoordinators: [],
            };

            if (values.type !== "single") {
                newData["maxTeamSize"] = values.maxTeamSize;
                newData["minTeamSize"] = values.minTeamSize;
            }

            coordsList.forEach((e) => {
                newData.mainCoordinators.push(e._id);
            });

            const oldIDs = oldData["mainCoordinators"].map(v=>v._id);            

            Object.entries(newData).forEach(([key, newValue]) => {
                if (key === 'rounds') {
                    newValue = JSON.parse(newValue)
                    for (let round of newValue) {
                        delete round.date
                    }
                    for (let round of oldData[key]) {
                        delete round.date
                    }
                }
                if (key === "mainCoordinators") {
                    
                    for (let id of oldIDs) {
                        if (!newValue.includes(id)) {
                            changed = 1;
                            break;
                        }
                    }
                    for (let id of newValue) {
                        if (!oldIDs.includes(id)) {
                            changed = 1;
                            break;
                        }
                    }

                    if(skipCoordinators)changed = 0
                    else if (changed) {
                        console.log(oldData[key]);
                        console.log(newValue);
                        newValue.forEach((id) => {
                            formData.append("mainCoordinators[]", id);
                        });
                    }
                } else if (JSON.stringify(oldData[key]) !== JSON.stringify(newValue)) {
                    formData.append(key, newValue);
                    changed = 1;
                    console.log("new value: ");
                    console.log(newValue);
                    console.log("Old value" );
                    console.log(JSON.stringify(oldData[key]));
                }
            });

            console.log(formData);
            if (changed) {
                const res = await updateEvent(formData);
                console.log(res);
                successPop("Event Added successfully.");
                if(skipCoordinators)infoPop("No coordinators selected. The coordinators list will remain unchanged")
            } else {
                infoPop("You have not done any changes compared to original data", "No changes Found");
            }
        } catch (err) {
            console.log(err);
            const detailed = err.response?.data?.message;
            errorPop(detailed, "Error");
        } finally {
            setLoading(false);
            setIsSubmitModalOpen(false);
        }
    };

    const handleGetAllMembers = async () => {
        try {
            setFetchingAllMembers(true)
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
            setAllMembers(tmp);
            // console.log(tmp);
        } catch (err) {
            console.log(err);
            const errormsg = err.response ? err.response.data.message : err.message;
            errorPop(`ERROR: ${errormsg}`, "Error while fetching all members");
        } finally {
            setFetchingAllMembers(false)
        }
    };

    useEffect(() => {
        handleGetAllMembers();
    }, []);

    const handleEditImage = async (imageFile) => {
        // <- This will send the selected image to our api
        try {
            console.log(imageFile);

            const res = await postImage({ image: imageFile });
            console.log(res.data.data.imageUrl);
            return res.data.data.imageUrl;
        } catch (err) {
            console.log(err);
            const errormsg = err.response ? err.response.data.message : err.message;
            errorPop(`ERROR: ${errormsg}`, "Image Handling error");
        }
    };

    const handleGetAllEvents = async () => {
        try {
            setFetchingAllEvents(true)
            const res = await getAllEvents(admin.role === 'admin' ? admin.email : "null");
            console.log(res);
            const finalopts = [];

            res.data.data.map((event, i) => {
                finalopts.push({
                    value: i,
                    searchField: event.eventName,
                    label: <HybridLabel imageURL={event.thumbnail} name={event.eventName} />,
                    original: event,
                });
            });
            setAllEventsData(finalopts);
        } catch (err) {
            console.log(err.response?.data);
            const detailed = err.response?.data?.message;
            errorPop(detailed || err.message, "Error While fetching allEvents");
        } finally {
            setFetchingAllEvents(false)
        }
    };

    const onEventSelect = (idx) => {
        const original = AllEventsData[idx].original;
        console.log(original);
        

        setSelectedEvent(AllEventsData[idx]);
        original.time = [dayjs(original.startTime), dayjs(original.endTime)];
        for (let round of original.rounds) {
            round.date = [dayjs(round.startTime), dayjs(round.endTime)]
        }

        form.setFieldsValue(original);
        setEventType(original.type);
        setCoordsList(original.mainCoordinators);
        console.log(original);

        // set poster
        setPosterList([
            {
                uid: "-1",
                url: original.poster,
                status: "done",
                name: original.poster.split("/")[-1],
            },
        ]);
        setOrigPosterList([
            {
                uid: "-1",
                url: original.poster,
                status: "done",
                name: original.poster.split("/")[-1],
            },
        ]);
        // set thumbnail
        setThumbnailList([
            {
                uid: "-1",
                url: original.thumbnail,
                status: "done",
                name: original.thumbnail.split("/")[-1],
            },
        ]);
        setOrigThumbnailList([
            {
                uid: "-1",
                url: original.thumbnail,
                status: "done",
                name: original.thumbnail.split("/")[-1],
            },
        ]);
    };

    useEffect(() => {
        handleGetAllEvents();
        handleGetAllMembers();
    }, []);

    return (
        <div style={{ maxWidth: 1200 }}>
            <div className="register-container">
                <span style={{ fontSize: "1.3rem", fontWeight: "500" }}>Find the Event to Edit</span>
                <br />
                <Select
                    size="large"
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Select an Event"
                    optionFilterProp="searchField"
                    onChange={onEventSelect}
                    options={AllEventsData}
                    value={selectedEvent}
                    notFoundContent={fetchingAllEvents ? <Spin tip="fetching events..." size="large" /> : null}
                ></Select>
                <br />

                <Alert
                    // message="Note"
                    message="If you cannot find an event you have just added in the dropdown, consider refreshing the page."
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
                        if (!selectedEvent) {
                            errorPop("Please select a member first", "No Event Selected");
                        } else {
                            setIsDeleteModalOpen(true);
                        }
                    }}
                >
                    Delete Event
                </Button>
                <Modal
                    title="Delete Data"
                    onOk={handleEventDeletion}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    confirmLoading={loading}
                    open={isDeleteModalOpen}
                    okText="Delete"
                    okType="danger"
                    cancelText="Cancel"
                    okButtonProps={{ type: "primary" }}
                >
                    Are you sure you want to delete this Event from Database?
                    <br />
                    Note that this Operation cannot be reverted.
                </Modal>
                <h1 style={{ marginTop: "1.2rem" }}>Edit an Event</h1>
                <Form form={form} layout="vertical" onFinish={onFinish} size="large" disabled = {!selectedEvent}>
                    {/* Name */}
                    <Form.Item
                        label="Event Name"
                        name="eventName"
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
                        name="rulesDocURL"
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
                    <span>Upload Poster and Thumbnail for the Event</span>
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
                                message="If you cannot find a member you have just added in the dropdown, consider refreshing the page."
                                type="info"
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
                                    for (let c of coordsList) {
                                        console.log(c);
                                        console.log(allMembers[idx].original._id);

                                        if (c._id === allMembers[idx].original._id) {
                                            return;
                                        }
                                    }

                                    setCoordsList([...coordsList, allMembers[idx].original]);
                                }}
                                options={allMembers}
                                value={selectedMember}
                                notFoundContent={fetchingAllMembers ? <Spin tip="fetching members..." size="large" /> : null}
                            ></Select>
                        </Form.Item>

                        <Space wrap style={{ marginBottom: "1rem" }}>
                            {coordsList.map((coord, i) => {
                                return (
                                    <Coordinator
                                        onClose={() => setCoordsList(coordsList.filter((m) => m._id !== coord._id))}
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
                                        <Form.Item {...restField} name={[name, "roundname"]}>
                                            <Input placeholder="Round Name (Optional)" />
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
                                Are you sure you want to edit this Event's details?
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

export default EventEditing;
