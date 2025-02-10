import React, { useRef, useState } from "react";
import { SearchOutlined, TeamOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Select, Tag, message } from "antd";
import * as XLSX from "xlsx";

const { Option } = Select;
const SINGLE_TABLE_WIDTH = 1000;
const TEAM_TABLE_WIDTH = 2000;
const singleReg = [
    {
        title: "#",
        dataIndex: "time",
        key: "time",
        width: 30,
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: true,
        width: 250,
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 200,
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
    {
        title: "#",
        dataIndex: "time",
        key: "time",
        width: 30,
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: true,
        width: 300,
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 200,
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        width: 300,
    },
    {
        title: "College",
        dataIndex: "college",
        key: "college",
        filters: [
            { text: "IIESTian", value: "IIEST Shibpur" },
            { text: "Non-IIESTian", value: "NonIIESTian" },
        ],
        onFilter: (value, record) =>
            value === "IIEST Shibpur" ? record.college === value : record.college !== "IIEST Shibpur",
        width: 500,
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
    },
    {
        title: "Team Name",
        dataIndex: "team",
        key: "team",
        width: 300,
    },
    {
        title: "Members",
        dataIndex: "members",
        key: "members",
        render: (members) => (
            <>
                {members.map((member, i) => {
                    return (
                        <Tag color={"blue"} key={i} icon={<TeamOutlined />}>
                            {member.name}
                        </Tag>
                    );
                })}
            </>
        ),
    },
];

const singleRegData = [
    {
        key: "1",
        time: "1",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        college: "IIT K",
        phone: "+1-234-567-8901",
        payment: "https://www.google.com",
    },
    {
        key: "2",
        time: "2",
        name: "Bob Smith",
        email: "bob.smith@example.com",
        college: "Indian Institute of Engineering Science and Technology, Shibpur",
        phone: "+1-345-678-9012",
    },
    {
        key: "3",
        time: "3",
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        college: "IIEST Shibpur",
        phone: "+1-456-789-0123",
    },
    {
        key: "4",
        time: "4",
        name: "Diana Prince",
        email: "diana.prince@example.com",
        college: "IIEST Shibpur",
        phone: "+1-567-890-1234",
    },
    {
        key: "5",
        time: "5",
        name: "Ethan Hunt",
        email: "ethan.hunt@example.com",
        college: "IIEST Shibpur",
        phone: "+1-678-901-2345",
    },
    {
        key: "6",
        time: "6",
        name: "Fiona Gallagher",
        email: "fiona.gallagher@example.com",
        college: "IIEST Shibpur",
        phone: "+1-789-012-3456",
    },
    {
        key: "7",
        time: "7",
        name: "George Clooney",
        email: "george.clooney@example.com",
        college: "IIEST Shibpur",
        phone: "+1-890-123-4567",
    },
    {
        key: "8",
        time: "8",
        name: "Hannah Montana",
        email: "hannah.montana@example.com",
        college: "IIEST Shibpur",
        phone: "+1-901-234-5678",
    },
    {
        key: "9",
        time: "9",
        name: "Isaac Newton",
        email: "isaac.newton@example.com",
        college: "IIEST Shibpur",
        phone: "+1-012-345-6789",
    },
    {
        key: "10",
        time: "10",
        name: "Jenny Lopez",
        email: "jenny.lopez@example.com",
        college: "IIEST Shibpur",
        phone: "+1-123-456-7890",
    },
];

const teamRegData = [
    {
        key: "1",
        time: "1",
        name: "Team Johnson",
        email: "alice.johnson@example.com",
        phone: "+1-234-567-8901",
        college: "IIEST Shibpur",
        team: "Innovators",
        members: [
            { name: "Bob Smith", email: "bob.smith@example.com" },
            { name: "Charlie Brown", email: "charlie.brown@example.com" },
        ],
    },
    {
        key: "2",
        time: "2",
        name: "Diana Prince",
        email: "diana.prince@example.com",
        phone: "+1-345-678-9012",
        college: "IIEST Shibpur",
        team: "Tech Titans",
        members: [
            { name: "Ethan Hunt", email: "ethan.hunt@example.com" },
            { name: "Fiona Gallagher", email: "fiona.gallagher@example.com" },
        ],
    },
    {
        key: "3",
        time: "3",
        name: "George Clooney",
        email: "george.clooney@example.com",
        phone: "+1-456-789-0123",
        college: "IIEST Shibpur",
        team: "Code Wizards",
        members: [
            { name: "Hannah Montana", email: "hannah.montana@example.com" },
            { name: "Isaac Newton", email: "isaac.newton@example.com" },
        ],
    },
    {
        key: "4",
        time: "4",
        name: "Jenny Lopez",
        email: "jenny.lopez@example.com",
        phone: "+1-567-890-1234",
        college: "IIEST Shibpur",
        team: "Debuggers",
        members: [
            { name: "Alice Johnson", email: "alice.johnson@example.com" },
            { name: "Bob Smith", email: "bob.smith@example.com" },
        ],
    },
    {
        key: "5",
        time: "5",
        name: "Katherine Perry",
        email: "katherine.perry@example.com",
        phone: "+1-678-901-2345",
        college: "IIEST Shibpur",
        team: "Syntax Squad",
        members: [
            { name: "Charlie Brown", email: "charlie.brown@example.com" },
            { name: "Diana Prince", email: "diana.prince@example.com" },
        ],
    },
    {
        key: "6",
        time: "6",
        name: "Leo Messi",
        email: "leo.messi@example.com",
        phone: "+1-789-012-3456",
        college: "IIEST Shibpur",
        team: "Byte Chasers",
        members: [
            { name: "Ethan Hunt", email: "ethan.hunt@example.com" },
            { name: "Fiona Gallagher", email: "fiona.gallagher@example.com" },
        ],
    },
    {
        key: "7",
        time: "7",
        name: "Michael Jordan",
        email: "michael.jordan@example.com",
        phone: "+1-890-123-4567",
        college: "IIEST Shibpur",
        team: "Hacktivists",
        members: [
            { name: "George Clooney", email: "george.clooney@example.com" },
            { name: "Hannah Montana", email: "hannah.montana@example.com" },
        ],
    },
    {
        key: "8",
        time: "8",
        name: "Nina Dobrev",
        email: "nina.dobrev@example.com",
        phone: "+1-901-234-5678",
        college: "IIEST Shibpur",
        team: "Cyber Soldiers",
        members: [
            { name: "Isaac Newton", email: "isaac.newton@example.com" },
            { name: "Jenny Lopez", email: "jenny.lopez@example.com" },
        ],
    },
    {
        key: "9",
        time: "9",
        name: "Oliver Queen",
        email: "oliver.queen@example.com",
        phone: "+1-012-345-6789",
        college: "IIEST Shibpur",
        team: "Quantum Coders",
        members: [
            { name: "Katherine Perry", email: "katherine.perry@example.com" },
            { name: "Leo Messi", email: "leo.messi@example.com" },
        ],
    },
    {
        key: "10",
        time: "10",
        name: "Patrick Star",
        email: "patrick.star@example.com",
        phone: "+1-123-456-7890",
        college: "IIEST Shibpur",
        team: "Ocean Hackers",
        members: [
            { name: "Michael Jordan", email: "michael.jordan@example.com" },
            { name: "Nina Dobrev", email: "nina.dobrev@example.com" },
        ],
    },
];

const EventMap = { Jack: singleRegData, Jill: teamRegData };

const getCellItem = (cellitem) => {
    if (typeof cellitem !== "object") return cellitem;
    return JSON.stringify(cellitem);
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
            style={{ marginBottom: "1rem" }}
        >
            Export as Excel
        </Button>
    );
};

const StatsTable = ({ data, columns, tableWidth, eventName, errorPop, infoPop, successPop }) => {
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
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
                <Table columns={columns} dataSource={data} size="middle" scroll={{ x: tableWidth }} />
            </div>
        )
    );
};

const RegistrationStats = ({ infoPop, errorPop, successPop }) => {
    const [dataSrc, setdataSrc] = useState([]);
    const [columns, setColumns] = useState(singleReg);
    const [tableWidth, setTableWidth] = useState(SINGLE_TABLE_WIDTH);
    const [eventName, setEventName] = useState(SINGLE_TABLE_WIDTH);

    const onChange = (value) => {
        setEventName(value);
        console.log(`selected ${value}`);
        const k = EventMap[value];
        setdataSrc(k);
        if (k && k[0] && k[0].team) {
            setColumns(teamReg);
            setTableWidth(TEAM_TABLE_WIDTH);
        } else {
            setColumns(singleReg);
            setTableWidth(SINGLE_TABLE_WIDTH);
        }
        console.log(`columns: ${JSON.stringify(columns)}`);
        console.log(k[0]);
    };

    return (
        <div style={{ maxWidth: 1200, minHeight: "100vh" }}>
            <div style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Select an Event</div>
            <Select
                size="large"
                style={{ width: "100%", marginBottom: "2rem" }}
                showSearch
                placeholder="Select an Event"
                optionFilterProp="value"
                onChange={onChange}
                options={[
                    {
                        value: "Jack",
                        label: (
                            <>
                                Single <Tag color="blue">#102018</Tag>
                            </>
                        ),
                    },
                    {
                        value: "Jill",
                        label: (
                            <>
                                Team <Tag color="blue">#102019</Tag>
                            </>
                        ),
                    },
                ]}
            ></Select>
            <br />
            <StatsTable
                data={dataSrc}
                columns={columns}
                tableWidth={tableWidth}
                eventName={eventName}
                errorPop={errorPop}
                infoPop={infoPop}
                successPop={successPop}
            />
        </div>
    );
};

export default RegistrationStats;
