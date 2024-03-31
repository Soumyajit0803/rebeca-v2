// import React from "react";
import React, { useEffect, useState } from "react";
import "./Sponsorship.css";
import SponsorCard from "./SponsorsCard";
import Heading from "../../components/Heading/Heading";

const Heading1 = ({ title, subTitle, w }) => {
	return (
		<div
			className="heading_spon"
			style={{
				width: w,
				position: "relative",
				padding: "2rem 2rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
                gap: "0.5rem",
                border: "0px solid red"
			}}
		>
			<div
				className="title display-font"
				style={{
					width: "100%",
					textAlign: "left",
				}}
			>
				{title}
			</div>
			{subTitle && (
				<div
					className="sub-title"
					style={{
						width: "100%",
						textAlign: "left",
					}}
				>
					{subTitle}
				</div>
			)}
		</div>
	);
};

function Sponsorship() {
	const [fileName, setFileName] = useState(""); // Set the flowchart picture
	const [widthSize, setWidthSize] = useState(""); // Set width size of the 2 heading content
	const [sponsorCategories, setSponsorCategories] = useState(""); // Set sponsor categories image

	const updateImageSource = () => {
		const newFileName =
			window.innerWidth > 800 ? "flowChart3" : "flowChart2";
		setFileName(newFileName);

		const newWidth = window.innerWidth > 1260 ? "75%" : "90%";
		setWidthSize(newWidth);

		const newSponsorCategories =
			newFileName === "flowChart3"
				? "sponsorCategories1"
				: "sponsorCategories2";
		setSponsorCategories(newSponsorCategories);
	};

	useEffect(() => {
		updateImageSource();
	}, []);

	useEffect(() => {
		window.addEventListener("resize", updateImageSource);
		return () => {
			window.removeEventListener("resize", updateImageSource);
		};
	}, []);

	const sponsorData = {
		sponsor1: { imgname: "IOCL.jpg" },
		sponsor2: { imgname: "ADOBE.jpg" },
		sponsor3: { imgname: "RR.png" },
		sponsor4: { imgname: "COAL.png" },
		sponsor5: { imgname: "LAKME.jpg" },
		sponsor6: { imgname: "SAIL.jpg" },
		sponsor7: { imgname: "DUCKBACK.jpg" },
		sponsor8: { imgname: "DOMINOS.jpg" },
		sponsor9: { imgname: "FRIENDSFM.jpg" },
		sponsor10: { imgname: "KTM.jpg" },
		sponsor11: { imgname: "COKESTUDIO.jpg" },
		sponsor12: { imgname: "OLA.png" },
		sponsor13: { imgname: "CESC.jpg" },
		sponsor14: { imgname: "Zomato.png" },
		sponsor15: { imgname: "WOW.png" },
		sponsor16: { imgname: "LINC.png" },
		sponsor17: { imgname: "Shapoorji.png" },
		sponsor18: { imgname: "simoco.png" },
	  };
	  
	  

	return (
		<>
			<div className="sponsor">
				<Heading
					title={"Want to sponsor us?"}
					subTitle={
						"Prepare to be swept away as you put your best foot forward in this epic celebration of creativity and culture tha promises you laughter, joy and memories that will last you a lifetime and more. Keep your water bottles handy and get ready to feel the heat cuz the 83rd edition of REBECA is back with a bang!"
					}
				></Heading>

				<section className="section-1">
					<div className="side-img">
						<img
							src="/assets/imgs/sponsorship/clockTower1.png"
							alt=""
						/>
					</div>

					<Heading1
						className={"heading_spon_first"}
						title={"Lets start with a little about our College"}
						subTitle={
							"IIEST, Shibpur, (formerly known as Bengal Engineering College), is one of India's oldest engineering institutions. Renowned for its excellence in engineering education and a strong emphasis on research, the institute nurtures aspiring engineers and scientists to become leaders in their fields.  Since the last 168 years, our college has been producing scores of distinguished alumni who have made us immensely proud through their work and dedication."
						}
						w={widthSize}
					></Heading1>
					<Heading1
						className={"heading_spon_second"}
						title={"What is Rebeca? "}
						subTitle={
							"REBECA, short for REunion and Bengal Engineering College Annuals, is the annual cultural fest of IIEST, Shibpur. From the classical Saptami night, to the BEings' night on Ashtami, from the soulful Kolkata symphonies on Navami, to the endless Bollywood magic on the Dashami night, our vibrant fest is nothing short of a second Durga Puja to us! Get ready as the 83rd edition of REBECA is right around the corner. BEings, Pujo asche!"
						}
						w={"70%"}
					></Heading1>
				</section>

				<section className="section-2">
					<div className="flow-chart">
						<img
							src={`/assets/imgs/sponsorship/${fileName}.png`}
							alt=""
						/>
					</div>
				</section>
				<section className="section-2">
					<div className="cover-pic">
						<img
							src="/assets/imgs/sponsorship/coverPic1.png"
							alt=""
						/>
					</div>
				</section>

				<section className="section-3">
					<Heading1 title={"Sponsor Categories"} w={"60%"}></Heading1>
					<div className="sponsor-categories">
						<img
							src={`/assets/imgs/sponsorship/${sponsorCategories}.png`}
							alt=""
						/>
					</div>
				</section>

				<section className="section-4">
					<Heading1 title={"Past-sponsors"} w={"60%"}></Heading1>
					<div className="center1">
						<div className="cards">
							{Object.values(sponsorData).map((sponsor, index) => (
								<SponsorCard key={index} sponsor={sponsor} />
							))}							
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
export default Sponsorship;
