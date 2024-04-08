import React from "react";
import "./Merchandise.css";
import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";

const Merchandise = () => {
  return (
		<div className="merch">
			<section className="section-1">
				<Heading
					title={"Merhandise"}
					subTitle={"Step into the world of REBECA in style! "}
				></Heading>
			</section>
			<section className="section-2">
				<div className="img">
					<img src="./assets/imgs/merch/tshirt3.png" alt="" />
				</div>
				<div className="content">
					Step into the world of REBECA in style! Get ready to immerse
					yourself in the vibrant energy of REBECA with our exclusive
					official merchandise - a symbol of creativity, unity, and
					cultural celebration!
					<br />
					Inspired by the eclectic spirit of REBECA, our merchandise
					features dynamic graphics and bold colors that capture the
					essence of our cultural fest, making it a must-have for
					everyone!
					<br />
					<br />
					Last Date - 14th April, 2024
					<br />
					<br />
					<a href="https://forms.gle/UZ6PtbZHB8HRm9oR6">
						<Button
							variant={"filled"}
							innerText={"Order yours now!"}
						></Button>
					</a>
				</div>
			</section>
		</div>
  );
};

export default Merchandise;
