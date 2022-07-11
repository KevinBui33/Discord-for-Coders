import "./Friend.css";
import {
  Avatar,
  TextField,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SocketContext } from "../../Context/SocketProvider";
import FriendListItem from "./FriendListItem";
import FriendNavBar from "./FriendNavBar";
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
    await api
      .getFriendship(item.toLowerCase(), sessionStorage.getItem("token"))
      .then((res) => {
        console.log(res);
        if (res.data) {
          setUsersList(res.data.requests);
        }
      });
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
      <div className="user-list-container">
        <List className="user-list">
          <ListItem className="user-list-title">Active Users</ListItem>
          {usersList.map((user, index) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>{user.username}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Friends;
