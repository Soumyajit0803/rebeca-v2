// import React from "react";
import React, { useEffect, useState } from "react";
import "./Sponsorship.css";
import SponsorCard from "./SponsorsCard";
import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import pastSponsorJsonData from "../../assets/data/pastSponsors.json";
import sponsorJsonData from "../../assets/data/sponsors.json";
import { Divider, Typography } from "@mui/material";

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
                border: "0px solid red",
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
        const newFileName = window.innerWidth > 800 ? "flowChart4" : "flowChart5";
        setFileName(newFileName);

        const newWidth = window.innerWidth > 1260 ? "75%" : "90%";
        setWidthSize(newWidth);

        const newSponsorCategories = window.innerWidth > 800 ? "sponsorCategories1" : "sponsorCategories2";
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

    const onButtonClick = () => {
        const pdfUrl = "/assets/rebeca84brochure.pdf";
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "Rebeca84Brochure.pdf"; // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="sponsor-wrap">
            <div className="sponsor">
                <Heading
                    title={"Want to sponsor us?"}
                    subTitle={
                        "Prepare to be swept away as you put your best foot forward in this epic celebration of creativity and culture tha promises you laughter, joy and memories that will last you a lifetime and more. Keep your water bottles handy and get ready to feel the heat cuz the 84th edition of REBECA is back with a bang!"
                    }
                ></Heading>
                <Link to={"#"}>
                    <Button
                        className="download_btn"
                        variant={"filled"}
                        innerText={"Download the brochure"}
                        endIcon={<span className="material-icons">file_download</span>}
                        onClick={onButtonClick}
                    ></Button>
                </Link>
                {/* <Divider sx={{my: 5}}/> */}
                <section className="section-1">
                    <div className="side-img">
                        <img src="/assets/imgs/sponsorship/clock-tower-iiest.webp" alt="clockTowerImg" />
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
                            "REBECA, short for REunion and Bengal Engineering College Annuals, is the annual cultural fest of IIEST, Shibpur. From the classical Saptami night, to the BEings' night on Ashtami, from the soulful Kolkata symphonies on Navami, to the endless Bollywood magic on the Dashami night, our vibrant fest is nothing short of a second Durga Puja to us! Get ready as the 84th edition of REBECA is right around the corner. BEings, Pujo asche!"
                        }
                        w={"70%"}
                    ></Heading1>
                </section>

                <section className="section-2">
                    <div className="flow-chart">
                        <img src={`/assets/imgs/sponsorship/${fileName}.webp`} alt="" />
                    </div>
                </section>
                {/* <section className="section-2">
					<div className="cover-pic">
						<img
							src="/assets/imgs/sponsorship/coverPic1.webp"
							alt=""
						/>
					</div>
				</section> */}

                <section className="section-3">
                    <Heading1 title={"Sponsor Categories"} w={"60%"}></Heading1>
                    <div className="sponsor-categories">
                        <img src={`/assets/imgs/sponsorship/${sponsorCategories}.webp`} alt="" />
                    </div>
                </section>
                <div
                    style={{
                        background: `url("/assets/imgs/sponsorship/backdrop.webp")`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "6rem 0",
                        width: "100vw",
                        height: "100vh"
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Sedgwick Ave Display",
                            padding: "2rem",
                            paddingBottom: "5rem",
                            fontSize: "2.2rem",
                            opacity: "0.5",
                            textAlign:"center"
                        }}
                    >
                        The oldest cultural fest of India
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            width: "min(80%, 70ch)",
                            textAlign: "center",
                            paddingTop: "5rem",
                            opacity: "0.8",
                        }}
                    >
                        Born in 1960, Rebeca is more than a cultural fest—it's a tradition etched in time. With every beat, spotlight, and standing ovation, it celebrates a history that no other college fest can claim.
                    </Typography>
                </div>

                <section className="section-4">
                    <div style={{ padding: "0 1rem" }}>
                        <Heading1 title={"Sponsors"}></Heading1>
                    </div>
                    {sponsorJsonData.map((item, index) => (
                        <div className="center1" key={index}>
                            <p style={{ paddingTop: "40px" }}>{item.title}</p>
                            <div className="cards">
                                {item.logos.map((logo, index) => (
                                    <SponsorCard key={index} sponsor={logo} />
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                <section className="section-4">
                    <div style={{ padding: "0 1rem" }}>
                        <Heading1 title={"Past-sponsors"}></Heading1>
                    </div>
                    <div className="center1">
                        <div className="cards">
                            {pastSponsorJsonData.map((sponsor, index) => (
                                <SponsorCard key={index} sponsor={sponsor} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default Sponsorship;

// in case needed, removed from sponsors.json
// {
// 	"id": 8,
// 	"title": "Drinks Partner",
// 	"logos": [
// 		{
// 			"imgname": "sponsorsImages/RED BULL"
// 		}
// 	]
// }
