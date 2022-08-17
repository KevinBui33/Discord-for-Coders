import "./Friend.css";
import {
  Avatar,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SocketContext } from "../../Context/SocketProvider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import FriendNavBar from "./FriendNavBar";
import {
  useChangeFriendStatusMutation,
  useGetUsersQuery,
} from "../../features/userApiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const Friends = () => {
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [notification, setNotification] = useState(false);
  const [listStatus, setListStatus] = useState("");

  // API calls
  const [changeFriendStatus, { isLoading }] = useChangeFriendStatusMutation();
  const [type, setType] = useState(skipToken);
  const result = useGetUsersQuery(type);
  const socket = useContext(SocketContext);

  // Set the inital state for navbar
  useEffect(() => {
    setType("online");
    setListStatus("Active Users");

    if (socket) {
      socket.on("test", (res) => {
        console.log("test socket");
        console.log(res);
      });
    }
  }, []);

  // Get friend request from server only when user is online
  useEffect(() => {
    if (socket) {
      socket.on("friend_request", (res) => {
        console.log(res);
        if (res.done) {
          // Set a red dot notification on pending
          setNotification(true);
          // if current nav option is pending, then live update it, if not then do nothing
          console.log(type);
          setType("pending");
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    console.log(result);
    if (result.isSuccess) {
      setUsersList(result.data.requests);
    } else {
      // TODO: Show error message
      // console.log("An error occured");
    }
  }, [result]);

  useEffect(() => {
    console.log(type);
  }, [type]);

  // Get users depending on which nav option user clicked
  const navOptionClick = async (item, event) => {
    event.preventDefault();

    // Change list title by nav option clicked
    switch (item) {
      case "Online":
        setListStatus("Active Users");
        break;
      case "All":
        setListStatus("All");
        break;
      case "Pending":
        setListStatus("Pending");
    }

    // Getting users
    setType(item.toLowerCase());
  };

  // Filter the users list based on the search
  const filterUsers = (e) => {
    setSearch(e.target.value);
  };

  const declineFriend = async (userId) => {
    console.log("accept");
    try {
      const res = await changeFriendStatus({ userId, status: "decline" });
    } catch (err) {}
  };

  const acceptFriend = () => {
    console.log("decline");
  };

  return (
    <div className="friend-container">
      <FriendNavBar
        navOptionClick={navOptionClick}
        notificationDot={
          notification ? <span className="btn-notif"></span> : ""
        }
        selectedOption={type}
      />
      <TextField
        fullWidth
        id="outlined-search"
        label="Search field"
        type="search"
        onChange={filterUsers}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />

      {result.isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="user-list-container">
          <Typography className="list-title">{listStatus}</Typography>
          <List className="user-list">
            {usersList.map((user, index) => (
              <div className="user-account-listitem" key={index}>
                <ListItem
                  className="user-account-container"
                  secondaryAction={
                    <div>
                      <IconButton
                        edge="end"
                        onClick={() => declineFriend(user.user_id)}
                      >
                        <CheckCircleIcon fontSize="large" />
                      </IconButton>
                      <IconButton onClick={acceptFriend}>
                        <CancelIcon fontSize="large" />
                      </IconButton>
                    </div>
                  }
                >
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
      )}
    </div>
  );
};

export default Friends;
