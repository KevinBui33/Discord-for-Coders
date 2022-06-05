import {
  Box,
  TextField,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import * as api from "../../Api/api";
import "./FriendPopUp.css";

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (username) => {
  return {
    sx: {
      bgcolor: stringToColor(username),
    },
    children: username
      .split(" ")
      .map((ch) => ch.charAt(0).toUpperCase())
      .join(""),
  };
};

function FriendPopUp({ trigger, setTrigger }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (search != "") {
        const data = await api.getUsers({ username: search });
        console.log(data);

        setResults(data.data);
      } else {
        setResults([]);
      }
    };

    fetchData().catch((err) => console.log(err));
  }, [search]);

  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="close-btn">
          <IconButton onClick={() => setTrigger(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            fullWidth
            id="friend-username"
            label="Add a friend"
            name="friend-username"
            autoComplete="friend-username"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <List sx={{ width: "90%", paddingTop: "20px" }}>
            {results.map((user) => (
              <ListItem
                key={user.user_id}
                disableGutters
                secondaryAction={<Button>Add Friend</Button>}
              >
                <ListItemAvatar>
                  <Avatar {...stringAvatar(user.username)} />
                </ListItemAvatar>

                <ListItemText primary={user.username} />
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
    </div>
  ) : (
    ""
  );
}

export default FriendPopUp;
