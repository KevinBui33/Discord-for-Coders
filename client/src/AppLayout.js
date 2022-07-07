import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Components/Navbar";
import SideBar from "./Components/SideBar/SideBar";

const AppLayout = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <SideBar />
      <div style={{ height: "100%", width: "100%" }}>
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
