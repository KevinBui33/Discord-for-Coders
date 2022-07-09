import React, { useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import "./FriendNavBar.css";

const MenuItems = ["Online", "All", "Pending"];

const FriendNavBar = ({ navOptionClick, notificationDot }) => {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <nav className="friend-navbar">
      <div className="navbar-logo">
        <GroupIcon fontSize="large" />
        <h2>Friends</h2>
      </div>
      <span></span>
      <ul className="navbar-menu">
        {MenuItems.map((item, index) => (
          <li key={index} className="navbar-item">
            <a
              className="navbar-links"
              href=""
              onClick={(event) => navOptionClick(item, event)}
            >
              {item}
            </a>
            {item === "Pending" ? notificationDot : ""}
          </li>
        ))}
      </ul>
      <button className="btn btn-primary btn-medium">Add Friend</button>
    </nav>
  );
};

export default FriendNavBar;
