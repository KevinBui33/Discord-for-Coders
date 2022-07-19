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
import { useGetUsersQuery } from "../../features/userApiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const Friends = () => {
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [notification, setNotification] = useState(false);
  const [clickedNavOption, setClickedNavOption] = useState("");
  const [listStatus, setListStatus] = useState("");

  const [type, setType] = useState(skipToken);
  const result = useGetUsersQuery(type);
  const socket = useContext(SocketContext);

  // Set the inital state for navbar
  useEffect(() => {
    setClickedNavOption("Online");
    setType("online");
    setListStatus("Active Users");
  }, []);

  // Get friend request from server only when user is online
  useEffect(() => {
    //TODO: This giving errors when redux state is "friends"
    console.log(socket);
    if (socket) {
      socket.on("get_friend_request", (res) => {
        console.log(res);
        if (res.done) {
          // Set a red dot notification on pending
          setNotification(true);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (result.isSuccess) {
      console.log(result);
      setUsersList(result.data.requests);
    } else {
      // TODO: Show error message
      // console.log("An error occured");
    }
  }, [result]);

  // Get users depending on which nav option user clicked
  const navOptionClick = async (item, event) => {
    event.preventDefault();
    console.log(item);
    setClickedNavOption(item);

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
    console.log(search);
  };

  const declineFriend = () => {
    console.log("accept");
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
        selectedOption={clickedNavOption}
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
                      <IconButton edge="end" onClick={acceptFriend}>
                        <CheckCircleIcon fontSize="large" />
                      </IconButton>
                      <IconButton onClick={declineFriend}>
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
