import React, {useRef, useState, useEffect} from "react";
import "./CollageHeart.css";
import g1 from "/assets/imgs/grid_images/gallery-2.webp";
import g2 from "/assets/imgs/grid_images/gallery-3.webp";
import g3 from "/assets/imgs/grid_images/gallery-7.webp";
import g4 from "/assets/imgs/grid_images/gallery-4.webp";
// import g5 from "/assets/imgs/grid_images/gallery-6.webp";
import g5 from "/assets/imgs/grid_images/q4.webp";
import g6 from "/assets/imgs/grid_images/gallery-1.webp";
import g7 from "/assets/imgs/grid_images/gallery-5.webp";
// import g8 from "/assets/imgs/grid_images/q4.webp";
import g8 from "/assets/imgs/grid_images/gallery-8.webp";
import g9 from "/assets/imgs/grid_images/gallery-11.webp";
import g10 from "/assets/imgs/grid_images/gallery-10.webp";
import g11 from "/assets/imgs/grid_images/gallery-12.webp";
import g12 from "/assets/imgs/grid_images/gallery-9.webp";
import g13 from "/assets/imgs/grid_images/q13.webp";

const images= [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13];

const CollageHeart = () => {
  const collageRef = useRef(null);
  const [isVisible, setIsVisible] = new useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (collageRef.current) {
      observer.observe(collageRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div ref={collageRef} className={`collage-container ${isVisible ? "visible" : ""}`}>
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