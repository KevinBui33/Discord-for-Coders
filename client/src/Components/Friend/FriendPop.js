import React from "react";

function FriendPop({ trigger }) {
  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn">Close popup</button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default FriendPop;
