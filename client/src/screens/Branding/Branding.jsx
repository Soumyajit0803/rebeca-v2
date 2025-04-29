import React from "react";
import "./Branding.css";

const Branding = () => {
  return (
    <div className="branding-container">
      <h2 className="branding-title">Why Sponsor Us ?</h2>
      <div className="branding-cards">
        <div className="branding-card">
          <h3 className="branding-heading">Market Development</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, 
            condimentum in laoreet in, congue in libero. Ut viverra cursus diam.
          </p>
        </div>
        <div className="branding-card branding-highlight">
          <div className="circle"></div>
          <h3 className="branding-heading">Market Development</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, 
            condimentum in laoreet in, congue in libero. Ut viverra cursus diam.
          </p>
        </div>
        <div className="branding-card">
          <h3 className="branding-heading">Market Development</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros lacus, 
            condimentum in laoreet in, congue in libero. Ut viverra cursus diam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Branding;
