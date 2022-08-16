import React, { useEffect, useState } from "react";
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import "./SideBar.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentView } from "../../features/chat/chatSlice";

//TODO: Replace test list to actual friend list
const test = [
  { username: "lll" },
  { username: "qqq" },
  { username: "www" },
  { username: "eee" },
];

const SideBar = ({ userData }) => {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setUserList(test);
  }, []);

  const friendView = () => {
    dispatch(setCurrentView({ view: "friends" }));
  };

  const chatView = () => {
    dispatch(setCurrentView({ view: "privateMsg" }));
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-buttons">
        <button className="friend-btn" onClick={friendView}>
          <GroupIcon />
          Friends
        </button>
      </div>
      <div className="user-list">
        <List>
          <Typography>DIRECT MESSAGES</Typography>
          {userList.map((item, index) => (
            <ListItemButton key={index} onClick={chatView}>
              <ListItemAvatar>
                <Avatar> </Avatar>
              </ListItemAvatar>
              <ListItemText>{item.username}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </div>
      <div className="user-options">
        <Avatar />
        <Typography>{userData.username}</Typography>
      </div>
    </div>
  );
};

export default SideBar;
