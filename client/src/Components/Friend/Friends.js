import "./Friend.css";
import { TextField, Typography, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { SocketContext } from "../../Context/SocketProvider";
import FriendListItem from "./FriendListItem";
import FriendNavBar from "./FriendNavBar";
import FriendPopUp from "./FriendPopUp";
import * as api from "../../Api/api";

const Friends = () => {
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [notification, setNotification] = useState(false);
  const socket = useContext(SocketContext);

  // Get friend request from server only when user is online
  useEffect(() => {
    socket.on("get_friend_request", (res) => {
      console.log(res);

      if (res.done) {
        // Set a red dot notification on pending
        setNotification(true);
      }
    });
  }, [socket]);

  const navOptionClick = async (item, event) => {
    event.preventDefault();
    console.log(item);

    // TODO: get users based off nav menu item clicked
    await api.getFriendship(item.toLowerCase());
  };

  return (
    <div style={{ padding: "50px" }}>
      <FriendNavBar
        navOptionClick={navOptionClick}
        notificationDot={
          notification ? <span className="btn-notif"></span> : ""
        }
      />
      <TextField
        fullWidth
        id="outlined-search"
        label="Search field"
        type="search"
        onChange={(e) => {
          setSearch(e.target.value);
          console.log(search);
        }}
      />
      <Box>
        {usersList.map((item, index) => (
          <FriendListItem item={item} index={index} />
        ))}
      </Box>
    </div>
  );
};

export default Friends;
