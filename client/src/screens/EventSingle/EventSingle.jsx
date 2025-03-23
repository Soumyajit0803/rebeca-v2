import React from "react";
import "./EventSingle.css";
import Button from "../../components/Button/Button";

const EventSingle = () => {
  return (
    <div className="event-single-container">
      {/* Background Image with Overlay */}
      <div className="event-single-banner" style = {{
          "position": `relative`,
          "width": `100%`,
          "height": `400px`,
          "background": `url("../../../public/assets/imgs/events/images/artival.webp") no-repeat center center/cover`,
      }}>
        <div className="event-single-overlay">
          <div className="event-single-header">
            <span className="event-single-badge">NEW</span>
            <h1 className="event-single-title">Rebescal</h1>
            <p className="event-single-subtitle">lorem ipsum doler sith lorem ipsum doler sith</p>
            <div className="event-single-price-tag">₹299</div>
          </div>

          <p className="event-single-description">
            Get ready to soak in the rich heritage of Indian culture as talented artists from all
            across the nation weave together a tapestry of grace and timeless magic, filling the
            air with the tunes of celebration and marking the very beginning of our very own Pujo.
          </p>
          <p className="event-single-description">
            Filling the air with the tunes of celebration and marking the very beginning of our
            very own Pujo.
          </p>

          <div className="event-single-buttons">
            <Button innerText="View Rules" />          
            <Button innerText="Register" />          
            </div>
        </div>
      </div>

      {/* Content Below */}
      <div className="event-single-content">
        <h2 className="schedule-title">Schedule</h2>
        {/*<p className="schedule-item">Round 1 - 12:00 to 14:00, 12th April - Amenities</p>
        <p className="schedule-item">Round 2 - 12:00 to 14:00, 13th April - Lords</p>*/}

        <div className="prelims-container">
          <div className="prelims-card">
            <h3>Prelims</h3>
            <p>🕒 12:00 IST - 15:00 IST</p>
            <p>📍 Lords Ground</p>
            <p>📅 10th April</p>
          </div>
          <div className="prelims-card">
            <h3>Prelims</h3>
            <p>🕒 12:00 IST - 15:00 IST</p>
            <p>📍 Lords Ground</p>
            <p>📅 10th April</p>
          </div>
          <div className="prelims-card">
            <h3>Prelims</h3>
            <p>🕒 12:00 IST - 15:00 IST</p>
            <p>📍 Lords Ground</p>
            <p>📅 10th April</p>
          </div>
        </div>
      </div>
      <div className="event-single-coordinators">
        <h2>Coordinators</h2>
        <div className="event-single-coordinator-card">
          <img src="../../../public/assets/imgs/team/abhijitkarmakar.jpg" alt="Coordinator" className="coordinator-img" />
          <div className="event-single-coordinator-info">
            <p className="event-single-coordinator-name">Abhijit karmakar</p>
            <p className="event-single-coordinator-phone">📞 9898989898</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSingle;
