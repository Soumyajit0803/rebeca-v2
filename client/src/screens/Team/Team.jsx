import React from "react";
import "./Team.css";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Container,
    Button,
    Box,
    Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomAvatar from "../../components/CustomAvatar/CustomAvatar";
import { useAuth } from "../../AuthContext";
import { skeleton } from "../../AuthContext";
import { East, Favorite } from "@mui/icons-material";

const profs = [
    { name: "Dr. Debdulal Das", position: "Chairperson", img: "./assets/imgs/Faculty/debdulaldas.webp" },
    { name: "Dr. Rajib Chakraborty", position: "Joint Convenor", img: "./assets/imgs/Faculty/rajibchakraborty.webp" },
    { name: "Dr. Gautam Anand", position: "Joint Convenor", img: "./assets/imgs/Faculty/gautamanand.webp" },
    { name: "Dr. Santanu Maity", position: "Treasurer", img: "./assets/imgs/Faculty/santanumaity.webp" },
];

const TeamLoading = () => {
    return (
        <div className="teamspage-loading" style={{height: '50vh'}}>
            <Card sx={{ width: "min(100%, 400px)" }}>
                <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}>
                    <CircularProgress color="primary" size={80} thickness={5} />
                    <Typography variant="h5">Hang tight, Fetching Teams Data...</Typography>
                    <Typography variant="body1" color="grey" sx={{ mb: 2, textAlign: "center" }}>
                        The best part of any party? When it becomes a story you swear you'll never tell.
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

function ProfessorsList() {
    return (
        <Container
            sx={{
                maxWidth: "1200px",
                padding: "5rem 2rem",
                margin: "0 2rem",
                gap: 5,
                borderRadius: "5px",
                bgcolor: "hsla(237, 100%, 70%, 0.2)",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "start",
            }}
        >
            {profs.map((professor, i) => {
                return (
                    <CustomAvatar
                        title={professor.name}
                        src={professor.img}
                        subtitle={professor.position}
                        icon={skeleton[0].icon}
                    />
                );
            })}
        </Container>
    );
}

const Team = () => {
    const {teamsData, teamsLoad} = useAuth()

    // useEffect(() => {
    //     const handleFetchAdmins = async () => {
    //         try {
    //             setLoading(true);
    //             const res = await getAllAdmins();
    //             const admins = res.data?.data;
    //             console.log(admins);
    //             const nteamsData = JSON.parse(JSON.stringify(skeleton));
    //             admins.map((admin) => {
    //                 var index = teamNameToId[admin.team];
    //                 nteamsData[index - 1]?.members.push(admin);
    //             });
    //             setTeamData(nteamsData);
    //         } catch (err) {
    //             console.log(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     handleFetchAdmins();
    // }, [user]);

    if (teamsLoad) {
        return <TeamLoading />;
    }

    return (
        teamsData &&
        !teamsLoad && (
            <div className="team">
                <h1>Meet Our Team</h1>
                <ProfessorsList />
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                    margin: "2rem 0",
                    borderRadius: "5px"
                }}>
                    <Typography textAlign={"center"} sx={{fontSize: "1.2rem", maxWidth: '70ch'}} color="text.secondary">
                    We are excited to invite you to be a part of REBECA as a <b>volunteer</b>! This is your chance to contribute, gain hands-on experience, and be a part of an incredible event. Whether you're interested in event management, social media, technical support, or hospitality, there's a place for you on our team!
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Favorite />}
                        endIcon={<East />}
                        onClick={() => window.open("https://forms.gle/qnceaoaaTiBTJ3627", "_blank")}
                        sx = {{mt: 2}}
                    >
                        Join as Volunteer
                    </Button>
                </Box>
                <Container className="team-container">
                    {teamsData.map((teamData, i) => {
                        if (teamData.members.length === 0) return;
                        console.log(teamData);

                        return (
                            <Accordion
                                sx={{ m: 0, p: 0 }}
                                slotProps={{ heading: { component: "h2" } }}
                                disableGutters
                                elevation={3}
                                key={i}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <div className="accordion-h">
                                        <div>{skeleton[i].icon}</div>
                                        {teamData.team}
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Container
                                        sx={{
                                            p: 5,
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 2,
                                            bgcolor: "#171717",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        {teamData.members.filter((member) => member.position==='head').map((member, ki) => {
                                            return (
                                                <CustomAvatar
                                                    title={member.name}
                                                    src={member.image}
                                                    subtitle={member.position}
                                                    phone={member.phone}
                                                    icon={skeleton[i].icon}
                                                    key={ki}
                                                />
                                            );
                                        })}
                                        
                                        {teamData.members.filter((member) => member.position==='associate head').map((member, ki) => {
                                            return (
                                                <CustomAvatar
                                                    title={member.name}
                                                    src={member.image}
                                                    subtitle={member.position}
                                                    phone={member.phone}
                                                    icon={skeleton[i].icon}
                                                    key={ki}
                                                />
                                            );
                                        })}
                                        
                                        {teamData.members.filter((member) => member.position==='associate').map((member, ki) => {
                                            return (
                                                <CustomAvatar
                                                    title={member.name}
                                                    src={member.image}
                                                    subtitle={member.position}
                                                    phone={member.phone}
                                                    icon={skeleton[i].icon}
                                                    key={ki}
                                                />
                                            );
                                        })}
                                    </Container>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </Container>
            </div>
        )
    );
};

export default Team;
