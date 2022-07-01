import "./Friend.css";
import { Avatar, Grid, TextField, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import GroupIcon from "@mui/icons-material/Group";
import FriendPopUp from "./FriendPopUp";

const friends = [
  {
    user_idL: 1,
    username: "ppppp",
  },
  {
    user_idL: 2,
    username: "qqqq",
  },
  {
    user_idL: 3,
    username: "aaaa",
  },
];

const contentButtons = ["Online", "All", "Pending"];

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#424549",
  color: "#fff",
}));

const Friends = () => {
  const [search, setSearch] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    setFriendsList(friends);
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <div className="content">
        <GroupIcon fontSize="large" />
        <Typography>Friends</Typography>
        <div className="content-friend">
          <ul className="content-friend-buttons">
            {contentButtons.map((item, index) => (
              <li key={index} className="conetent-friend-button">
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  {item}
                </a>
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
        {friendsList.map((item, index) => (
          <StyledPaper
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
            key={index}
          >
            <Grid container spacing={2}>
              <Grid item>
                <Avatar>{item.username.charAt(0)}</Avatar>
              </Grid>
              <Grid item>
                <Typography>{item.username}</Typography>
              </Grid>
            </Grid>
          </StyledPaper>
        ))}
      </Box>
    </div>
  );
};

export default Friends;
