// import React from "react";
import React, { useEffect, useState } from "react";
import "./Sponsorship.css";
import SponsorCard from "./SponsorsCard";
import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import pastSponsorJsonData from "../../assets/data/pastSponsors.json";
import sponsorJsonData from "../../assets/data/sponsors.json";

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
        const pdfUrl = "/assets/rebeca83brochure.pdf";
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "rebeca83brochure.pdf"; // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
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
                <section className="section-1">
                    <div className="side-img">
                        <img src="/assets/imgs/sponsorship/clockTower1.webp" alt="clockTowerImg" />
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

                <section className="section-4">
                    <div style={{ padding: "0 1rem" }}>
                        <Heading1 title={"Sponsors"} w={"60%"}></Heading1>
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

                <div className="section-4">
                    <Heading1 title={"Past Sponsors"} w={"60%"} />
                    <div className="past-sponsors-carousel-container">
                        <div className="rect1"></div>
                        <div className="rect2"></div>
                    
                        <div className="past-sponsors-carousel row-1">
                            {pastSponsorJsonData.slice(0, Math.ceil(pastSponsorJsonData.length / 2)).map((sponsor, index) => (
                                <div className="sponsor-card" key={index}>
                                    <SponsorCard sponsor={sponsor} />
                                </div>
                            ))}
                        </div>

                       
                        <div className="past-sponsors-carousel row-2">
                            {pastSponsorJsonData.slice(Math.ceil(pastSponsorJsonData.length / 2)).map((sponsor, index) => (
                                <div className="sponsor-card" key={index}>
                                    <SponsorCard sponsor={sponsor} />
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
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