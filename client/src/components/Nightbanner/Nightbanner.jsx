import React from "react";
import { Link } from "react-router-dom";
import "./Nightbanner.css";

import CustomButton from "../Button/Button";

const Description = {
  saptami:
    "The classical night. Get ready to soak in the rich heritage of Indian culture as talented artists from all across the nation weave together a tapestry of grace and timeless magic, filling the air with the tunes of celebration and marking the very beginning of our very own Pujo.",
  ashtami:
    "The BEings night. The evening will come alive as the BEings take the center stage by storm with their electrifying performances and ignite the atmosphere with their talent and creativity. Don't forget to cheer your hearts out for your best friends as they spew fire across the stage and make the night a celebration of the incredible talent amongst us.",
  navami:
    "The Kolkata night. Underneath the starlit sky, lose yourself in the symphony of Kolkata's soul. Come out and cheer as the legends of our beloved city rock the stage and give us an evening of musical euphoria that transcends all the boundaries of language and region making all our hearts beat as one, to the sweet rhythm of Navami.",
  dashami:
    "The Mumbai night. Take your dancing shoes out as you'll be screaming and dancing like nobody's watching to the electrifying beats of Bollywood! Join in on the infectious energy as you dance all night long in the grand finale of our festival and create a lifetime of memories that stay with you long after the night has faded into dawn",
};

const BannerLeft = ({ day }) => {
  return (
    <div className={`banner-wrapper banner-${day.toLowerCase()}`}>
      <div className="img-section">
        <div className="f1">
          <img src={`/assets/imgs/collage/${day.toLowerCase()}-1.webp`} />
        </div>
        <div className="f2">
          <video muted autoPlay loop>
            <source src={`/assets/imgs/collage/${day.toLowerCase()}-vd.webm`} type="video/webm" />
          </video>
        </div>
        <div className="f3">
          <img src={`/assets/imgs/collage/${day.toLowerCase()}-2.webp`} />
        </div>
        <div className="f4">
          <img src={`/assets/imgs/collage/${day.toLowerCase()}-3.webp`} />
        </div>
      </div>
      <div className="typography-section">
        <Link to={`/events/day/${day.toLowerCase()}`}>
          <div>{day.toUpperCase()}</div>
        </Link>
        <p>{Description[day.toLowerCase()]}</p>
        <Link to={`/events/day/${day.toLowerCase()}`}>
          <CustomButton variant={"filled"} innerText={"Learn More"}></CustomButton>
        </Link>
      </div>
    </div>
  );
};
const BannerRight = ({ day }) => {
  return (
    <div className={`banner-wrapper-2 banner-${day.toLowerCase()}`}>
      <div className="typography-section">
        <Link to={`/events/day/${day.toLowerCase()}`}>
          <div>{day.toUpperCase()}</div>
        </Link>
        <p>{Description[day.toLowerCase()]}</p>
        <Link to={`/events/day/${day.toLowerCase()}`}>
          <CustomButton variant={"filled"} innerText={"Learn More"}></CustomButton>
        </Link>
      </div>
      <div className="img-section">
        <div className="f1">
          <img src={`/assets/imgs/collage/${day.toLowerCase()}-1.webp`} />
        </div>
        <div className="f2">
          <video muted autoPlay loop>
            <source src={`/assets/imgs/collage/${day.toLowerCase()}-vd.webm`} type="video/webm" />
          </video>
        </div>
        <div className="f3">
          <img src={`/assets/imgs/collage/${day.toLowerCase()}-2.webp`} />
        </div>
        <div className="f4">
          <img src={`/assets/imgs/collage/${day.toLowerCase()}-3.webp`} />
        </div>
      </div>
    </div>
  );
};

const Nightbanner = () => {
  return (
    <div className="check">
      <BannerLeft day={"Saptami"} />
      <BannerRight day={"Ashtami"} />
      <BannerLeft day={"Navami"} />
      <BannerRight day={"Dashami"} />
    </div>
  );
};

export default Nightbanner;
