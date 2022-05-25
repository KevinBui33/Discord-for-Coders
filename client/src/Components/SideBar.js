import "../SideBar.css";
import React from "react";

function SideBar() {
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
      </ul>
    </div>
  );
}

export default SideBar;
