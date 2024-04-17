import React from "react";
import "./Sponsorship.css";

const styles = {
  margin: "auto 0",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.25)",
  transition:" all 0.2s",
  width:"200px",
  height:"150px",
  display:"flex",
  alignItems:"center",
};



const SponsorCard = ({sponsor}) => {
  return (
    <div style={styles} className="card" > 
           
      <img src={`/assets/imgs/sponsorship/${sponsor.imgname}.webp`} alt="" style={      
        {
            width:"100%",
            borderRadius: "10px",
        }
      } />
    </div>
  );
};
export default SponsorCard;
