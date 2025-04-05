import React from "react";
import "./Footer2.css";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { EmailRounded, FacebookRounded, Instagram } from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer2 = () => {
    return (
        <div style={{ position: "relative" }}>
            <div className="topimg">
                <img src="/assets/imgs/Footer/concert-blue.webp" />
            </div>
            <div className="footer2">
                <div className="left-col">
                    <Link to="/">
                        <div className="logo">
                            <img src="/assets/logo/logo_white.webp" alt="" />
                        </div>
                    </Link>

                    <div className="address">
                        <a href="https://www.google.com/maps/dir/22.6390704,88.3426543/Indian+Institute+of+Engineering+Science+and+Technology,+Shibpur+(IIEST),+Indian+Institute+of+Engineering+Science+and+Technology,+Botanical+Garden+Area,+Howrah,+West+Bengal+711103/@22.5970861,88.2890036,13z/data=!3m1!4b1!4m17!1m7!3m6!1s0x3a0279c91a8d2d49:0xc6ee508c74cf031d!2sIndian+Institute+of+Engineering+Science+and+Technology,+Shibpur+(IIEST)!8m2!3d22.5551124!4d88.3061642!16zL20vMDRkcGRs!4m8!1m1!4e1!1m5!1m1!1s0x3a0279c91a8d2d49:0xc6ee508c74cf031d!2m2!1d88.3061642!2d22.5551124?entry=ttu">
                            IIEST SHIBPUR, PO: Botanic Garden, Botanical Garden Road, IIEST Shibpur, Howrah-711103, West
                            Bengal
                        </a>
                    </div>
                    <div className="address">© rebeca.in 2025. All right reserved</div>
                    {/* <div className="address">
					Made with 💙 by{" "}
					<a href="https://dugarrishab.github.io/RishabDugar/">
						Rishab Dugar
					</a>
					,{" "}
					<a href="https://abhijit-karmakar.vercel.app/">
						Abhijit Karmakar
					</a>
					,{" "}
					<a href="https://soumyajit-dev.vercel.app/">
						Soumyajit Karmakar
					</a>{" "}
					and <a href="">Utsab Kundu</a>
				</div> */}
                </div>
                <div className="right-col">
                    <div className="title">Contacts</div>
                    <div className="contacts">
                        <div className="contact">
                            <div className="name">Dr. Debdulal Das
                            </div>

                            <div className="ph-num">Chairperson</div>
                        </div>
                        <div className="contact">
                            <div className="name">Dr. Rajib Chakraborty</div>

                            <div className="ph-num">Joint Convenor</div>
                        </div>
                        <div className="contact">
                            <div className="name">Dr. Gautam Anand</div>

                            <div className="ph-num">Joint Convenor</div>
                        </div>
                        <div className="contact">
                            <div className="name">Dr. Santanu Maity</div>

                            <div className="ph-num">Treasurer</div>
                        </div>
                        {/* <div className="contact">
                            <div className="name">Ujjwal Chaudhari</div>

                            <div className="ph-num">
                                <span className="material-icons">person</span>+91 95552 09179
                            </div>
                        </div> */}
                        <div className="contact">
                            <div className="name">Sudhanshu Mishra</div>

                            <div className="ph-num" style={{whiteSpace: "nowrap"}}>
                                <span className="material-icons">phone</span>+91-95993-68639
                            </div>
                        </div>
                        <div className="contact">
                            <div className="name">Ivan jacob Thomas</div>

                            <div className="ph-num" style={{whiteSpace: "nowrap"}}>
                                <span className="material-icons">phone</span>+91-74638-84470
                            </div>
                        </div>
                    </div>
                </div>
                <div className="social">
                    <div className="social-h">Visit us Virtually</div>
                    <div className="social-icons">
                        <a href="mailto: 83rebeca2k24@gmail.com">
                            <IconButton sx={{bgcolor: 'var(--primary)', '&:hover':{
                                bgcolor: 'rgb(93, 93, 93)'
                            }}} size="medium">
                                <EmailRounded />
                            </IconButton>
                        </a>
                        <a href="https://www.facebook.com/rebeca.iiests">
                            <IconButton sx={{bgcolor: 'var(--primary)', '&:hover':{
                                bgcolor: 'rgb(93, 93, 93)'
                            }}} size="medium">
                                <FacebookRounded />
                            </IconButton>
                        </a>
                        <a href="https://www.instagram.com/rebeca_iiests">
                            <IconButton sx={{bgcolor: 'var(--primary)', '&:hover':{
                                bgcolor: 'rgb(93, 93, 93)'
                            }}} size="medium">
                                <Instagram />
                            </IconButton>
                        </a>
                        <a href="https://www.youtube.com/@rebecaiiests7685">
                            <IconButton sx={{bgcolor: 'var(--primary)', '&:hover':{
                                bgcolor: 'rgb(93, 93, 93)'
                            }}} size="medium">
                                <YouTubeIcon />
                            </IconButton>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer2;
