import React from "react";
import "./Sponsorship.css";

const styles = {
  height: "250px",
  width: "400px",
  margin: "auto 0",
  padding: "auto 0",

  margin: "20px",
  padding: "20px",
  width: "340px",
  minHeight: "200px",
  display: "grid",
  gridTemplateRows: "20px 50px 1fr 50px",
  borderRadius: "10px",
  boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.25)",
  transition:" all 0.2s",
};



const SponsorCard = ({sponsor}) => {

    console.log(sponsor.imgname);
  return (
    <div style={styles} className="card" >        
      <img src={`/assets/imgs/sponsorship/SponsorsImg/${sponsor.imgname}.webp`} alt="" style={
        {
            width:"300px",
            height:"210px",
            borderRadius: "10px",
        }
      } />
    </div>
  );
};
export default SponsorCard;
