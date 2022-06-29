import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Components/SideBar/SideBar";

const AppLayout = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
