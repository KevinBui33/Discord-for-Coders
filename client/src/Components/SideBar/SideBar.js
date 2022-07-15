import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import "./SideBar.css";

const test = [
  { username: "lll" },
  { username: "qqq" },
  { username: "www" },
  { username: "eee" },
];

function SideBar() {
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
      <div className="user-options"></div>
    </div>
  );
}

export default SideBar;
