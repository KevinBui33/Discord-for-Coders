import React, { useEffect } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/authSlice";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import Friends from "../Friend/Friends";
import { setCurrentView } from "../../features/chat/chatSlice";
import { SocketProvider } from "../../Context/SocketProvider";
import { useGetUserInfoQuery } from "../../features/userApiSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { activeView } = useSelector((state) => state.chat);

  const userInfo = useGetUserInfoQuery();

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <SocketProvider>
      <div className="dashboard">
        <div className="dashboard-container">
          <div className="sidebar">
            <SideBar
              userData={userInfo.isSuccess ? userInfo.data : "No user"}
            />
          </div>
          <div className="chat">
            {activeView === "friends" ? <Friends /> : <Chat />}
          </div>
        </div>
      </div>
    </SocketProvider>
  );
};

export default Dashboard;
