import "../../Styles/SideBar.css";
import React from "react";
import { SideBarList } from "./SideBarLinks";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <nav className="nav-menu">
      <ul className="nav-menu-items">
        {SideBarList.map((item, index) => (
          <li key={index} className="nav-text">
            <Link to={item.path}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideBar;
