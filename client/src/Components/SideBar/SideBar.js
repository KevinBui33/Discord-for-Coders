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
import { useSelector } from "react-redux";

//TODO: Replace test list to actual friend list
const test = [
  { username: "lll" },
  { username: "qqq" },
  { username: "www" },
  { username: "eee" },
];

const SideBar = ({ userData }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setUserList(test);
  }, []);

  return (
    <div className="sidebar-container">
      <div className="sidebar-buttons">
        <button className="friend-btn">
          <GroupIcon />
          Friends
        </button>
      </div>
      <div className="user-list">
        <List>
          <Typography>DIRECT MESSAGES</Typography>
          {userList.map((item, index) => (
            <ListItemButton key={index}>
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
