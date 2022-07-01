import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar/SideBar";

const AppLayout = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <SideBar />
      <div style={{ height: "100%", width: "100%" }}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
