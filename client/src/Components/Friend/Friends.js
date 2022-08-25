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
import { userApi } from "../../api/userApi";

const Friends = () => {
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [notification, setNotification] = useState(false);
  const [listStatus, setListStatus] = useState({});

  // API calls
  const socket = useContext(SocketContext);

  // Set the inital state for navbar + get all the users friends
  useEffect(() => {
    setListStatus({ type: "Online", subTitle: "Active Users" });
    async function fetchData() {
      await userApi.getFriends("online").then((res) => console.log(res));
    }
    fetchData();
  }, []);

  // Get friend request from server only when user is online
  useEffect(() => {}, [socket]);

  // Get users depending on which nav option user clicked
  const navOptionClick = async (item, event) => {
    event.preventDefault();

    // Change list title by nav option clicked
    switch (item) {
      case "Online":
        setListStatus({ type: item, subTitle: "Active Users" });
        break;
      case "All":
        setListStatus({ type: item, subTitle: "All" });
        break;
      case "Pending":
        setListStatus({ type: item, subTitle: "Pending" });
    }

    await userApi.getFriends(item?.toLowerCase()).then((res) => {
      setUsersList(res.requests);
    });
  };
  const declineFriend = async (userId) => {};

  const acceptFriend = async (userId) => {
    socket.emit("accept_friend", { userId }, (data, err) => {
      //TODO Display toast msg for accepting friend request + update firend list
      console.log(data);
    });
  };

  return (
    <div className="friend-container">
      <FriendNavBar
        navOptionClick={navOptionClick}
        notificationDot={
          notification ? <span className="btn-notif"></span> : ""
        }
        selectedOption={listStatus.type}
      />
      <TextField
        fullWidth
        id="outlined-search"
        label="Search field"
        type="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />

      <div className="user-list-container">
        <Typography className="list-title">{listStatus.type}</Typography>
        <List className="user-list">
          {usersList
            .filter((user) => user.username.includes(search))
            .map((user, index) => (
              <div className="user-account-listitem" key={index}>
                <ListItem
                  className="user-account-container"
                  secondaryAction={
                    <div>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          acceptFriend(user.user_id);
                        }}
                      >
                        <CheckCircleIcon fontSize="large" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          declineFriend(user.user_id);
                        }}
                      >
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
    </div>
  );
};

export default Friends;
