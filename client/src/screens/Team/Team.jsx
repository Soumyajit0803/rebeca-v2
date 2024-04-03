import React, { useState, useEffect } from "react";
import Heading from "../../components/Heading/Heading";
import "./Team.css";
import { Autocomplete, TextField } from "@mui/material";

const Team = () => {
	const teams = [
		{
			id: 1,
			name: "Coordinator",
			members: [
				{
					name: "Souvik Sengupta",
					position: "Main Coordinator",
					img: "/assets/profiles/souviksengupta.jpeg",
				},
				{
					name: "Sayan Mitra",
					position: "Main Coordinator",
					img: "/assets/profiles/sayon.jpeg",
				},
				{
					name: "Shubham Mishra",
					position: "Assistant Main Coordinator",
					img: "/assets/profiles/shubham.jpeg",
				},
				{
					name: "Priyanshu Aggarwal",
					position: "Assistant Main Coordinator",
					img: "/assets/profiles/IMG_20230216_211627 - 2020EEB079 PRIYANSHU_AGRAWAL.png",
				},
			],
		},
		{
			id: 2,
			name: "Finance & Audit",
			members: [
				{
					name: "Rajdeep Chakrabarty",
					position: "Head",
					img: "/assets/profiles/B612_20221002_231041_053 - 510619041 Rajdeep_Chakrabarty.jpg",
				},
				{
					name: "Ritu Raj Ranjan Mishra",
					position: "Associate Head",
					img: "/assets/profiles/ritu raj.jpeg",
				},
				{
					name: "Sanjay Sharma",
					position: "Associate",
					img: "/assets/profiles/IMG_20220831_010337 - 2021EEB077 SANJAY_SHARMA.jpg",
				},
			],
		},
		{
			id: 3,
			name: "Design",
			members: [
				{
					name: "Jayanth Avadhani ",
					position: "Head",
					img: "/assets/profiles/IMG_20221025_132239571 - 510619064 M_Avadhani.jpg",
				},
				{
					name: "Moulindu Mandal",
					position: "Head",
					img: "/assets/profiles/moulindo.jpeg",
				},
				{
					name: "Geeta Birua",
					position: "Associate Head",
					img: "/assets/profiles/geeta.jpeg",
				},
				{
					name: "Satarupa Mahato",
					position: "Associate Head",
					img: "/assets/profiles/satarupa.jpeg",
				},
				{
					name: "Pradip Sikder",
					position: "Associate Head",
					img: "/assets/profiles/PicsArt_02-14-01.10.35-01-01-04 - 2020EEB052 PRADIP_SIKDAR(1).jpeg",
				},
				{
					name: "Madhushree Shaw",
					position: "Associate",
					img: "/assets/profiles/IMG_20221023_191231-01 - 2021EEB023 MADHUSREE_SHAW.jpeg",
				},
				{
					name: "Arneet Dutta",
					position: "Associate",
					img: "/assets/profiles/arneet.jpg",
				},
				{
					name: "Debankan Chatterjee ",
					position: "Associate",
					img: "/assets/profiles/20230309_133307 - 2021EEB080 DEBANKAN_CHATTERJEE.jpg",
				},
				{
					name: "Priyanshu Kumar",
					position: "Associate",
					img: "/assets/profiles/IMG-20230312-WA0007-01 - 2021EEB094 PRIYANSHU_KUMAR.jpeg",
				},
			],
		},
		{
			id: 4,
			name: "Sponsorship",
			members: [
				{
					name: "Sayak Chowdhury ",
					position: "Head",
					img: "/assets/profiles/sayak.jpeg",
				},
				{
					name: "Samudrala Vasanth",
					position: "Head",
					img: "/assets/profiles/vasanth.jpeg",
				},
				{
					name: "Prayukta dey",
					position: "Head",
					img: "/assets/profiles/WhatsApp Image 2023-03-28 at 1.32.48 AM - 510619013 Prayukta_Dey.jpeg",
				},
				{
					name: "Abhishek Kumar",
					position: "Associate Head",
					img: "/assets/profiles/abhishek.jpeg",
				},
				{
					name: "Rinku Kanwar Shaktawat",
					position: "Associate Head",
					img: "/assets/profiles/rinku.jpeg",
				},
				{
					name: "Shreetama Majumdar",
					position: "Associate Head",
					img: "/assets/profiles/Picsart_23-01-03_21-49-09-652 - 2020EEB032 SHREETAMA_MAJUMDAR	.jpg",
				},
				{
					name: "Soma Sai Sattwik",
					position: "Associate Head ",
					img: "/assets/profiles/sattwik.jpeg",
				},
				{
					name: "Anurag Patel",
					position: "Associate",
					img: "/assets/profiles/DSC_0348 - 2021EEB033 ANURAG_PATEL.jpg",
				},
				{
					name: "Dishan Bhuin",
					position: "Associate",
					img: "/assets/profiles/dishan.jpeg",
				},
				{
					name: "Yashika Mittal",
					position: "Associate",
					img: "/assets/profiles/IMG-20230121-WA0038__01 - 2021EEB087 YASHIKA_MITTAL.jpg",
				},
				{
					name: "Sashank Kumar",
					position: "Associate",
					img: "/assets/profiles/sashank.jpeg",
				},
				{
					name: "Sakshi Mishra",
					position: "Associate",
					img: "/assets/profiles/2021EEB046.jpeg_1 - 2021EEB046 SAKSHI_MISHRA.jpg",
				},
			],
		},
		{
			id: 5,
			name: "Publicity",
			members: [
				{
					name: "Jainendra Kumar Triloki ",
					position: "Head",
					img: "/assets/profiles/1628158012274 - Copy - 510619038 Jainendra_Triloki.jpg",
				},
				{
					name: "Ayan kamar",
					position: "Head",
					img: "/assets/profiles/ayan.jpeg",
				},
				{
					name: "Abhinav Singh ",
					position: "Associate Head",
					img: "/assets/profiles/abhinav.jpeg",
				},
				/*{
					name: "Oindrila Biswas ",
					position: "Associate Head",
					img: "/assets/profiles/dp.jpg",
				},*/ /*{
					name: "Prince Kumar",
					position: "Associate Head",
					img: "/assets/profiles/dp.jpg",
				},*/ {
					name: "Gourab Mondal",
					position: "Associate Head ",
					img: "/assets/profiles/IMG-20230322-WA0014 - 2020EEB006 GOURAB_MONDAL.jpg",
				},
				{
					name: "Astitva Nath Mishra",
					position: "Associate",
					img: "/assets/profiles/DSC_0777 - 2021EEB025 ASTITVA_NATH MISHRA.JPG",
				},
				/*{
					name: "Disha Mondal ",
					position: "Associate",
					img: "/assets/profiles/dp.jpg",
				},*/ {
					name: "Prinshu Kumar",
					position: "Associate",
					img: "/assets/profiles/prinshu.jpeg",
				},
				{
					name: "Gourav Das ",
					position: "Associate",
					img: "/assets/profiles/IMG_20221018_160257 - 2021EEB084 GOURAV_DAS.jpg",
				},
			],
		},
		{
			id: 6,
			name: "Content",
			members: [
				{
					name: "Swarnila Roy",
					position: "Head",
					img: "/assets/profiles/IMG_5124 - 510619039 SWARNILA_ROY.jpg",
				},
				{
					name: "Ushasi Naskar",
					position: "Head",
					img: "/assets/profiles/IMG_20230313_200244 - 510619017 Ushasi_Naskar.jpg",
				},
				{
					name: "Pratim Ghosh  ",
					position: "Head",
					img: "/assets/profiles/IMG_20230312_161352 - 510619034 PRATIM_GHOSH.jpg",
				},
				{
					name: "Pulkit Kapoor ",
					position: "Associate Head",
					img: "/assets/profiles/20230114_113043 - 2020EEB049 PULKIT_KAPOOR.jpg",
				},
				{
					name: "Bipro Bhadra ",
					position: "Associate Head",
					img: "/assets/profiles/bipro.jpeg",
				},
				{
					name: "Sharanya Bhattacharya",
					position: "Associate",
					img: "/assets/profiles/Screenshot_20230322_234456 - 2021EEB079 SHARANYA_BHATTACHARJEE.jpg",
				},
				{
					name: "B Sudeshna",
					position: "Associate",
					img: "/assets/profiles/sudeshna.jpeg",
				} /*{
					name: "Abhinay Kumar Nalapothula ",
					position: "Associate",
					img: "/assets/profiles/dp.jpg",
				},*/,
			],
		},
		{
			id: 7,
			name: "Logistics",
			members: [
				{
					name: "Shubham Sarraf",
					position: "Head",
					img: "/assets/profiles/InShot_20210717_005020589 - 510619103 Shubham_sarraf.jpg",
				},
				{
					name: "Hansraj kumar",
					position: "Head",
					img: "/assets/profiles/1653849017982 (1) - 510619095 Hansraj_Kumar.jpg",
				},
				{
					name: "Deepa Jha",
					position: "Head",
					img: "/assets/profiles/IMG-20230405-WA0012.jpg",
				},
				{
					name: "Utsav Kumar Vishwakarma  ",
					position: "Associate Head",
					img: "/assets/profiles/utsav.jpeg",
				},
				{
					name: "Anand Kumar",
					position: "Associate Head",
					img: "/assets/profiles/anand.jpeg",
				},
				{
					name: "Sougat Mahato",
					position: "Associate Head ",
					img: "/assets/profiles/Remini20220130214904477__01 - 2020EEB076 SOUGAT_MAHATO.jpg",
				},
				{
					name: "Ankit kumar ",
					position: "Associate",
					img: "/assets/profiles/ankit.jpeg",
				},
				/*{
					name: "Pritam Kumar Baski ",
					position: "Associate",
					img: "/assets/profiles/dp.jpg",
				},*/ {
					name: "Divya",
					position: "Associate",
					img: "/assets/profiles/Snapchat-522438405 - 2021EEB075 DIVYA_.jpg",
				},
			],
		},
		{
			id: 8,
			name: "Event Management",
			members: [
				{
					name: "Mayank Kumar",
					position: "Head",
					img: "/assets/profiles/DSC_0038 - 510619042 Mayank_Kumar.jpg",
				},
				{
					name: "Rishav Choudhuri",
					position: "Head",
					img: "/assets/profiles/IMG_20230403_000758_758.jpg",
				},
				{
					name: "Arghyadeep Sarkar",
					position: "Head",
					img: "/assets/profiles/arghyadeep.jpeg",
				},
				{
					name: "Rajat Rahar",
					position: "Associate Head",
					img: "/assets/profiles/rajatrahar.jpeg",
				},
				{
					name: "Ishita Bhaya",
					position: "Associate Head",
					img: "/assets/profiles/IMG20221005000543 - 2020EEB074 ISHITA_BHAYA.jpg",
				},
				{
					name: "Dilshad Adil",
					position: "Associate Head",
					img: "/assets/profiles/dilshad.jpeg",
				},
				{
					name: "Soubhagya Saha ",
					position: "Associate Head ",
					img: "/assets/profiles/SquarePic_20221225_12274683 - 2020EEB042 SOUBHAGYA_SAHA.jpg",
				},
				/*{
					name: "Shreyansh Trivedi ",
					position: "Associate",
					img: "/assets/profiles/1679510937303 - 2021EEB093 SHREYANSH_TRIVEDI.jpg",
				},*/ {
					name: "Saksham Kumar",
					position: "Associate",
					img: "/assets/profiles/saksham.jpeg",
				},
				/*{
					name: "Aanya kumari",
					position: "Associate",
					img: "/assets/profiles/dp.jpg",
				},*/ {
					name: "Sachin Saw",
					position: "Associate",
					img: "/assets/profiles/IMG_20220528_225214_092 - 2021EEB083 SAW_SACHIN KUMAR YAMUNA.jpg",
				},
			],
		},
		{
			id: 9,
			name: "Website",
			members: [
				{
					name: "Astha Kumari",
					position: "Head",
					img: "/assets/profiles/IMG_20221211_165314_018 - 510619072 ASTHA_KUMARI.jpg",
				},
				{
					name: "Subhro Sen ",
					position: "Head",
					img: "/assets/profiles/IMG_20230321_171835 - 510619113 SUBHRO_SEN.jpg",
				},
				{
					name: "Anirban Mukherjee",
					position: "Associate Head",
					img: "/assets/profiles/anirban.jpeg",
				},
				/*{
					name: "Naveen Chamaria",
					position: "Associate Head",
					img: "/assets/profiles/dp.jpg",
				},*/ {
					name: "Nafis Adnan Mondal",
					position: "Associate",
					img: "/assets/profiles/nafis.jpg",
				},
				{
					name: "Rishab Dugar ",
					position: "Associate",
					img: "/assets/profiles/newDP 1.jpg",
				},
			],
		},
	];

	const [selectedTeam, setSelectedTeam] = useState(teams[0]);
	const handleMenuClick = (team) => {
		setSelectedTeam(team);
	};

	const handleDropDownClick = (teamName) => {
		console.log(teamName);
		setSelectedTeam(teams.find(team => team.name == teamName));
	}

	const { innerWidth: width, innerHeight: height } = window;

	return (
		<div className="team">
			<Heading title="Meet our Team"></Heading>
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
								{selectedTeam.members.map((mem) => (
									<div className="member" key={mem.id}>
										<div className="img">
											<img
												src="/assets/circlex300.png"
												alt=""
												className="circle"
											/>
											<div className="dp">
												<img src={mem.img} alt=""></img>
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
			;
		</div>
	);
};

export default Team;
