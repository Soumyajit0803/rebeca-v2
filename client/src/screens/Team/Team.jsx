import React, { useState, useEffect } from "react";
import Heading from "../../components/Heading/Heading";
import "./Team.css";
import { Autocomplete, TextField, Card, CardContent, Typography, CircularProgress } from "@mui/material";
// import teams from "../../assets/data/team.json";
import { getAllAdmins } from "../../services/userApi";

const skeleton = [
    { id: 1, team: "Secretary General", members: [] },
    { id: 2, team: "Finance", members: [] },
    { id: 3, team: "Cultural", members: [] },
    { id: 4, team: "Event", members: [] },
    { id: 5, team: "Resource Information", members: [] },
    { id: 6, team: "Travel and Logistics", members: [] },
    { id: 7, team: "Sponsorship", members: [] },
    { id: 8, team: "Publication", members: [] },
    { id: 9, team: "Publicity", members: [] },
    { id: 10, team: "Stage Decoration", members: [] },
    { id: 11, team: "Business and Alumni Meet", members: [] },
    { id: 12, team: "Competitions and Seminars", members: [] },
    { id: 13, team: "Web Development", members: [] },
    { id: 14, team: "Refreshments", members: [] },
    { id: 15, team: "Volunteers", members: [] },
    { id: 16, team: "Photography", members: [] },
    { id: 17, team: "Joint Secretary", members: [] },
    { id: 18, team: "Fixed Signatory", members: [] },
    { id: 19, team: "BECA Magazine", members: [] },
];

const teamNameToId = {
    "Secretary General": 1,
    Finance: 2,
    Cultural: 3,
    Event: 4,
    "Resource Information": 5,
    "Travel and Logistics": 6,
    Sponsorship: 7,
    Publication: 8,
    Publicity: 9,
    "Stage Decoration": 10,
    "Business and Alumni Meet": 11,
    "Competitions and Seminars": 12,
    "Web Development": 13,
    Refreshments: 14,
    Volunteers: 15,
    Photography: 16,
    "Joint Secretary": 17,
    "Fixed Signatory": 18,
    "BECA Magazine": 19,
};

const TeamLoading = () => {
    return (
        <div className="teamspage-loading">
            <Card sx={{ width: "min(100%, 400px)" }}>
                <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}>
                    <CircularProgress color="primary" size={80} thickness={5} />
                    <Typography variant="h5">Fetching Data...</Typography>
                    <Typography variant="body1" color="grey" sx={{ mb: 2, textAlign: "center" }}>
                        While it's loading, shout out 'REBECA'!
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

function ProfessorsList() {
    const profs = [
        { name: "Dr. Nityananda Nandi", position: "Chairperson", img: "./assets/imgs/team/nityanandanandi.webp" },
        { name: "Dr. Ananya Barui", position: "Joint Convenor", img: "./assets/imgs/team/ananyabarui.webp" },
        { name: "Dr. Subhabrata Koley", position: "Joint Convenor", img: "./assets/imgs/team/subhabratakoley.webp" },
        { name: "Dr. Santanu Maity", position: "Treasurer", img: "./assets/imgs/team/santanumaity.webp" },
    ];

    return (
        <div className="professor-wrapper">
            <div className="professors">
                {profs.map((prof, i) => {
                    return (
                        <div className="member" key={i}>
                            <div className="img">
                                <img src="/assets/imgs/circle.png" alt="" className="circle" />
                                <div className="dp">
                                    <img src={prof.img} alt=""></img>
                                </div>
                            </div>
                            <div className="details">
                                <div className="name">{prof.name}</div>
                                <div className="position">{prof.position}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const Team = () => {
    const [teamsData, setTeamData] = useState(skeleton);
    const [selectedTeam, setSelectedTeam] = useState(teamsData[0]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleFetchAdmins = async () => {
            try {
                setLoading(true);
                const res = await getAllAdmins();
                const admins = res.data?.data;
                console.log(admins);
                const nteamsData = JSON.parse(JSON.stringify(skeleton));
                admins.map((admin) => {
                    var index = teamNameToId[admin.team];
                    nteamsData[index - 1].members.push(admin);
                });
                setTeamData(nteamsData);
                setSelectedTeam(nteamsData[0]);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        handleFetchAdmins();
    }, []);

    const handleMenuClick = (team) => {
        setSelectedTeam(team);
    };

    const handleDropDownClick = (teamName) => {
        console.log(teamName);
        setSelectedTeam(teamsData[teamNameToId[teamName] - 1]);
    };

    const { innerWidth: width, innerHeight: height } = window;

    if (loading) {
        return <TeamLoading />;
    }

    return (
        teamsData &&
        !loading && (
            <div className="team">
                <Heading title="Meet our Team"></Heading>
                <ProfessorsList />
                <div className="lower-body">
                    {width < 720 ? (
                        <Autocomplete
                            disablePortal
                            className="team-dropdown"
                            options={[...teamsData?.filter((team) => team.members.length)?.map((team) => team.team)]}
                            sx={{
                                mt: "00px",
                                mr: "0px",
                                color: "white !important",
                                width: "300px",

                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "rgb(150, 150, 150)",
                                        color: "white",
                                        height: "60px",
                                        borderRadius: "5px",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "var(--primary)",
                                    },
                                    "&:focus fieldset": {
                                        borderColor: "var(--primary)",
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color: "rgb(150, 150, 150)",
                                },
                                "& .MuiOutlinedInput-input": {
                                    color: "white",
                                    bgcolor: "var(--bg)",
                                    border: "0px solid red",
                                    height: "100%",
                                },
                            }}
                            renderInput={(params) => <TextField {...params} label="Team Name" />}
                            onChange={(e, value) => handleDropDownClick(value)}
                        />
                    ) : (
                        <div className="menu">
                            {teamsData
                                ?.filter((team) => team.members.length)
                                ?.map((team) => (
                                    <div
                                        key={team.id}
                                        className={`item ${selectedTeam && team.id === selectedTeam.id && "active"}`}
                                        onClick={() => handleMenuClick(team)}
                                    >
                                        {team.team}
                                    </div>
                                ))}
                        </div>
                    )}

                    <div className="results">
                        {selectedTeam ? (
                            <>
                                <div className="title">{selectedTeam.team}</div>
                                <div className="members">
                                    {selectedTeam.members.map((mem, index) => (
                                        <div className="member" key={index}>
                                            <div className="img">
                                                <img src="/assets/imgs/circle.png" alt="" className="circle" />
                                                <div className="dp">
                                                    <img src={mem.image} alt=""></img>
                                                </div>
                                                {!mem.image && (
                                                    <div className="dp2">
                                                        <img src="/assets/imgs/team/dp2.webp" alt="" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="details">
                                                <div className="name">{mem.name}</div>
                                                <div className="position">{mem.position}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p>Please select an option</p>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default Team;
