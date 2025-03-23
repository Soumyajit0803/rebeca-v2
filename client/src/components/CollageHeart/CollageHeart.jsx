import React from "react";
import "./CollageHeart.css";
import g1 from "/assets/imgs/grid_images/q1.png";
import g2 from "/assets/imgs/grid_images/q2.png";
import g3 from "/assets/imgs/grid_images/q3.png";
import g4 from "/assets/imgs/grid_images/q4.png";
import g5 from "/assets/imgs/grid_images/q5.png";
import g6 from "/assets/imgs/grid_images/q6.png";
import g7 from "/assets/imgs/grid_images/q7.png";
import g8 from "/assets/imgs/grid_images/q8.png";
import g9 from "/assets/imgs/grid_images/q9.png";
import g10 from "/assets/imgs/grid_images/q10.png";
import g11 from "/assets/imgs/grid_images/q11.png";
import g12 from "/assets/imgs/grid_images/q12.png";
import g13 from "/assets/imgs/grid_images/q13.png";

const images= [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13];

const CollageHeart = () => {
  return (
    <div className="collage-container">
      {images.slice(0, 13).map((src, index) => (
        <div
          key={index}
          className={`collage-item item-${index}`}
          style={{ backgroundImage: `url(${src})` }}
        ></div>
      ))}
    </div>
  );
};

export default CollageHeart;