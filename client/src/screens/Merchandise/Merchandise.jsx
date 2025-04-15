import React from "react";
import "./Merchandise.css";
import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";

const Merchandise = () => {
    return (
        <div className="merch">
            <section className="section-1">
                <Heading title={"Merhandise"} subTitle={"Step into the world of REBECA in style! "}></Heading>
            </section>
            <section className="section-2">
                <div className="img">
                    <img src="./assets/imgs/merch/tshirt-public.webp" alt="" />
                </div>
                <div className="content">
                    Step into REBECA in style! Celebrate the spirit of creativity, unity, and cultural flair with our
                    exclusive official merchandise.<br></br>
                    Inspired by the vibrant energy of REBECA, our collection bursts with bold colors and dynamic designs
                    — a perfect reflection of the fest's electrifying vibe.<br></br>
                    Whether you're a performer, a fan, or just soaking in the fun, this merch is your ultimate keepsake
                    from the celebration of the year!
					<br />
					<br />
					<br />
                    <a href="https://forms.gle/czHdDb8mCFY6g8rt8">
                        <Button disabled={true} variant={"filled"} innerText={"Order yours now!"}></Button>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Merchandise;
