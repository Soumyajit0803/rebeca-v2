import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined, TeamOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Select, Tag, Spin, Avatar, Card } from "antd";
import * as XLSX from "xlsx";
import { getAllEvents, getAllEnrollments } from "../../api";
import { useAuth } from "../../AuthContext";

const { Option } = Select;
const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
const singleReg = [
    {
        title: "TimeStamp",
        dataIndex: "timeStamp",
        key: "timeStamp",
        width: 150,
        render: (timeStamp, record) => (
            <Space>
                <div>{formatDate(timeStamp)}</div>
            </Space>
        ),
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: true,
        width: 300,
        render: (name, record) => (
            <Space>
                <Avatar src={record.image} style={{ width: 36, height: 36 }}></Avatar>
                <div style={{ minWidth: 100 }}>
                    <h3>{name}</h3>
                </div>
            </Space>
        ),
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 260,
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        width: 150,
    },
    {
        title: "College",
        dataIndex: "college",
        width: 400,
        key: "college",
        filters: [
            { text: "IIESTian", value: "IIEST Shibpur" },
            { text: "Non-IIESTian", value: "NonIIESTian" },
        ],
        onFilter: (value, record) =>
            value === "IIEST Shibpur" ? record.college === value : record.college !== "IIEST Shibpur",
    },
    {
        title: "Payment",
        dataIndex: "payment",
        key: "payment",
        render: (link) =>
            link && (
                <a href={link} target="_blank">
                    Link
                </a>
            ),
        width: 100,
    },
];

const teamReg = [
    ...singleReg,
    {
        title: "Team Name",
        dataIndex: "teamName",
        key: "teamName",
        width: 200,
    },
    {
        title: "Members",
        dataIndex: "members",
        key: "members",
        width: 800,
        render: (members) => (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {members.length > 0 &&
                    members.map((member, i) => (
                        <Space
                            key={i}
                            style={{ backgroundColor: "rgb(56, 56, 56)", padding: "0.3rem", borderRadius: "5px" }}
                        >
                            <Avatar src={member.image} style={{ width: 46, height: 46 }}></Avatar>
                            <div style={{ minWidth: 100 }}>
                                {member.name}
                                <br />
                                <span style={{ opacity: 0.6 }}>{member.email}</span>
                            </div>
                        </Space>
                    ))}
            </div>
        ),
    },
];
const ColumnMap = { single: singleReg, team: teamReg };
const TableWidth = { single: 1400, team: 2400 };

const formatObjects = (objects) => {
    return objects.map(obj => `${obj.name}, ${obj.email}`).join('\n');
  };
  
const getCellItem = (cellItem) => {
    if (typeof cellItem !== "object") return cellItem;
    return formatObjects(cellItem);
};

const ExportExcelButton = ({ dataSource, columns, fileName, errorPop, infoPop, successPop }) => {
    const exportToExcel = () => {
        if (fileName === 1000) {
            errorPop("No event Selected");
            return;
        } else if (!dataSource) {
            infoPop("No one has registered in this event yet");
            return;
        }
        const data = dataSource.map((item) => columns.map((col) => getCellItem(item[col.dataIndex])));
        const ws = XLSX.utils.aoa_to_sheet([columns.map((col) => col.title), ...data]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${fileName}.xlsx`);
        successPop("Data exported successfully");
    };

    return (
        <Button
            onClick={exportToExcel}
            type="primary"
            icon={<DownloadOutlined />}
            iconPosition="end"
            size="large"
            style={{ margin: "1rem 0" }}
        >
            Export as Excel
        </Button>
    );
};

const StatsTable = ({ data, columns, tableWidth, eventName, errorPop, infoPop, successPop, loading }) => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    size="large"
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="large"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="large"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="large"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    columns[2] = {
        title: "Email",
        dataIndex: "email",
        key: "email",
        ...getColumnSearchProps("email"),
    };

    return (
        data && (
            <div>
                <ExportExcelButton
                    dataSource={data}
                    columns={columns}
                    fileName={eventName}
                    errorPop={errorPop}
                    infoPop={infoPop}
                    successPop={successPop}
                />
                <Table columns={columns} dataSource={data} size="middle" scroll={{ x: tableWidth }} loading={loading}/>
            </div>
        )
    );
};

const HybridLabel = ({ name, imageURL }) => {
    return (
        <Space>
            <Avatar src={imageURL} alt={name} style={{ width: 32, height: 32 }} />
            <div>{name}</div>
        </Space>
    );
};

const RegistrationStats = ({ infoPop, errorPop, successPop }) => {
    const [AllEventsData, setAllEventsData] = useState([]);
    const [allEnrollData, setAllEnrollData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [fetchingAllEvents, setFetchingAllEvents] = useState(false);
    const [fetchingAllEnrolls, setFetchingAllEnrolls] = useState(false);
    const [columns, setColumns] = useState(singleReg);
    const [tableWidth, setTableWidth] = useState(1400);
    const { admin } = useAuth();

    const handleGetAllEvents = async () => {
        try {
            setFetchingAllEvents(true);
            const res = await getAllEvents(admin.role === "admin" ? admin.email : "null");
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
            setFetchingAllEvents(false);
        }
    };

    const handleGetAllEnrollments = async (eventId) => {
        try {
            setFetchingAllEnrolls(true);
            const res = await getAllEnrollments(eventId);
            const enrollData = res.data;

            const edata = enrollData.map((e) => ({
                id: e._id, // Rename _id to id (optional)
                name: e.userId.name, // Include the entire userId object or specific fields
                email: e.userId.email,
                phone: e.userId.phone,
                college: e.userId.college,
                payment: e.paymentScreenshot || "",
                teamName: e.teamName || "",
                members: e.teamMembers,
                image: e.userId.image,
                timeStamp: e.createdAt,
            }));

            setAllEnrollData(edata);
        } catch (err) {
            console.log(err.response?.data);
            const detailed = err.response?.data?.message;
            errorPop(detailed || err.message, "Error While fetching allEnrollMents");
        } finally {
            setFetchingAllEnrolls(false);
        }
    };

    const onEventSelect = (idx) => {
        const original = AllEventsData[idx].original;
        setSelectedEvent(AllEventsData[idx].searchField);
        handleGetAllEnrollments(original._id);
        setColumns(ColumnMap[original.type]);
        setTableWidth(TableWidth[original.type]);
    };

    useEffect(() => {
        handleGetAllEvents();
    }, []);

    return (
        <div style={{ maxWidth: 1200, minHeight: "100vh" }}>
            <div style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Select an Event</div>
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
            <StatsTable
                data={allEnrollData}
                columns={columns}
                tableWidth={tableWidth}
                eventName={selectedEvent}
                errorPop={errorPop}
                infoPop={infoPop}
                successPop={successPop}
                loading={fetchingAllEnrolls}
            />
        </div>
    );
};

export default RegistrationStats;
