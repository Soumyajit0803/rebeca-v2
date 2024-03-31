import React from "react";
import "./Autocarousel.css";

import A1 from "../../../public/assets/imgs/artists/artist1.png";
import A2 from "../../../public/assets/imgs/artists/artist2.png";
import A3 from "../../../public/assets/imgs/artists/artist3.png";

const Autocarousel = () => {
  return (
    <div className="autocarousel-wrapper">
      <div className="elements">
        <img src = {A1} />
        <img src = {A2} />
        <img src = {A2} />
        <img src = {A2} />
        <img src = {A2} />
        <img src = {A2} />
      </div>
      <div className="elements">
      <img src = {A1} />
        <img src = {A2} />
        <img src = {A2} />
        <img src = {A2} />
        <img src = {A2} />
        <img src = {A2} />
      </div>
    </div>
  );
};

export default Autocarousel;
