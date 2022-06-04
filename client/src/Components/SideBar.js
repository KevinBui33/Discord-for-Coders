import "../Styles/SideBar.css";
import React, { useState } from "react";
import FriendPopUp from "./Friend/FriendPopUp";

// TODO: Have the ability to add friends

function SideBar() {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <div className="sidebar">
      <ul className="sidebarList">
        <li className="row">
          <div id="title">Overview</div>
        </li>
        <li className="row">
          <div id="title">Channels</div>
        </li>
        <li className="row">
          <div id="title">Ranodm</div>
        </li>
        <li className="row">
          <div id="title">Ov</div>
        </li>
        <li className="row">
          <div id="title">Overview</div>
        </li>
        <li className="row">
          <div id="title" onClick={() => setShowPopUp(true)}>
            Add Friend
          </div>
          <FriendPopUp trigger={showPopUp} setTrigger={setShowPopUp} />
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
