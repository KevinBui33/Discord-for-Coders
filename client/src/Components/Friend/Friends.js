import "./Friend.css";
import { TextField, Typography, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import GroupIcon from "@mui/icons-material/Group";
import FriendPopUp from "./FriendPopUp";
import { SocketContext } from "../../Context/SocketProvider";
import FriendListItem from "./FriendListItem";

const contentButtons = ["Online", "All", "Pending"];

const Friends = () => {
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const socket = useContext(SocketContext);

  // TODO: Put some red dot for notification
  useEffect(() => {
    socket.on("get_friend_request", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div style={{ padding: "50px" }}>
      <div className="content">
        <GroupIcon fontSize="large" />
        <Typography>Friends</Typography>
        <div className="content-friend">
          <ul className="content-friend-buttons">
            {contentButtons.map((item, index) => (
              <li key={index} className="content-friend-button">
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();

                    // TODO: set the usersList by api call
                  }}
                >
                  {item}
                </a>
                <span className="content-friend-badge" />
              </li>
            ))}
          </ul>
          <Button
            style={{
              backgroundColor: "#7289da",
              color: "#fff",
              height: "80%",
              marginTop: "10px",
            }}
            onClick={() => setShowPopUp(true)}
          >
            Add Friend
          </Button>
          <FriendPopUp trigger={showPopUp} setTrigger={setShowPopUp} />
        </div>
      </div>

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
