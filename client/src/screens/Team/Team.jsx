import React, { useState, useEffect } from "react";
import Heading from "../../components/Heading/Heading";
import "./Team.css";
import { Autocomplete, TextField } from "@mui/material";
import teams from "../../assets/data/team.json";

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
    const [selectedTeam, setSelectedTeam] = useState(teams[0]);
    const handleMenuClick = (team) => {
        setSelectedTeam(team);
    };

    const handleDropDownClick = (teamName) => {
        console.log(teamName);
        setSelectedTeam(teams.find((team) => team.name == teamName));
    };

    const { innerWidth: width, innerHeight: height } = window;

    return (
		<div className="team">
			<Heading title="Meet our Team"></Heading>
			<ProfessorsList />
			<div className="lower-body">
				{width < 720 ? (
					<Autocomplete
						disablePortal
						className="team-dropdown"
						options={[...teams.map((team) => team.name)]}
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
						renderInput={(params) => (
							<TextField {...params} label="Team Name" />
						)}
						onChange={(e, value) => handleDropDownClick(value)}
					/>
				) : (
					<div className="menu">
						{teams.map((team) => (
							<div
								key={team.id}
								className={`item ${
									selectedTeam &&
									team.id === selectedTeam.id &&
									"active"
								}`}
								onClick={() => handleMenuClick(team)}
							>
								{team.name}
							</div>
						))}
					</div>
				)}

				<div className="results">
					{selectedTeam ? (
						<>
							<div className="title">{selectedTeam.name}</div>
							<div className="members">
								{selectedTeam.members.map((mem, index) => (
									<div className="member" key={index}>
										<div className="img">
											<img
												src="/assets/imgs/circle.png"
												alt=""
												className="circle"
											/>
											<div className="dp">
												<img src={mem.img} alt=""></img>
											</div>
											<div className="dp2">
												<img
													src="/assets/imgs/team/dp2.webp"
													alt=""
												/>
											</div>
										</div>
										<div className="details">
											<div className="name">
												{mem.name}
											</div>
											<div className="position">
												{mem.position}
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					) : (
						<div className="title">Please select an option</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Team;
