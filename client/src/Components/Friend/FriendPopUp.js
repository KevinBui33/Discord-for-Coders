import React from "react";
import "./FriendPopUp.css";

function FriendPopUp({ trigger, setTrigger }) {
  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => setTrigger(false)}>
          Close popup
        </button>
        <h3>Pop up element</h3>
      </div>
    </div>
  ) : (
    ""
  );
}

export default FriendPopUp;
