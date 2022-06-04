import "../Styles/SideBar.css";
import React from "react";

// TODO: Have the ability to add friends

function SideBar() {
  const addFriend = () => {
    console.log("adding friend ");
  };

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
          <div id="title" onClick={addFriend}>
            Add Friend
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
