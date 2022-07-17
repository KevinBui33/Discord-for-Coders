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
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import FriendNavBar from "./FriendNavBar";
import * as api from "../../api/api";

// TODO: Replace api import with RTK query module for API calls
// TODO: Have a default friend nav option be "clicked" when going to dashboard
// TODO: Set background color when nav item  clicked

const Friends = () => {
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [notification, setNotification] = useState(false);
  const [clickedNavOption, setClickedNavOption] = useState("");
  const [listStatus, setListStatus] = useState("");
  const socket = useContext(SocketContext);

  useEffect(() => {
    setClickedNavOption("Online");
  }, []);

  // Get friend request from server only when user is online
  useEffect(() => {
    // TODO: This giving errors when redux state is "friends"
    // socket.on("get_friend_request", (res) => {
    //   console.log(res);
    //   if (res.done) {
    //     // Set a red dot notification on pending
    //     setNotification(true);
    //   }
    // });

    setUsersList([
      { username: "lll" },
      { username: "qqq" },
      { username: "www" },
      { username: "eee" },
    ]);
  }, [socket]);

  useEffect(() => {
    switch (clickedNavOption) {
      case "Online":
        setListStatus("Active Users");
        break;
      case "All":
        setListStatus("All");
        break;
      case "Pending":
        setListStatus("Pending");
    }
  }, [clickedNavOption]);

  const navOptionClick = async (item, event) => {
    event.preventDefault();
    console.log(item);

    setClickedNavOption(item);

    // TODO: get users based off nav menu item clicked
  };

  return (
    <div className="friend-container">
      <FriendNavBar
        navOptionClick={navOptionClick}
        notificationDot={
          notification ? <span className="btn-notif"></span> : ""
        }
        selectedOption={clickedNavOption}
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
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
      <div className="user-list-container">
        <Typography className="list-title">{listStatus}</Typography>
        <List className="user-list">
          {usersList.map((user, index) => (
            <div className="user-account-listitem">
              <ListItem key={index} className="user-account-container">
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <div>
                  <ListItemText primary={user.username} />
                  <ListItemText secondary="Incoming Friend Request" />
                </div>
              </ListItem>
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Friends;
