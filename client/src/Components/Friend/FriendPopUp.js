import {
  Box,
  TextField,
  IconButton,
  Typography,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState, useContext } from "react";
import * as api from "../../Api/api";
import "./FriendPopUp.css";
import { SocketContext } from "../../Context/SocketProvider";

function FriendPopUp({ trigger, setTrigger }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState({});
  const [errorState, setErrorState] = useState(false);
  const socket = useContext(SocketContext);

  let statusComp;

  const addFriend = async (data) => {
    if (search === "") setErrorState(true);

    console.log(`Sending friend request to ${search}`);
    await socket.emit("add_friend", search, ({ err, done }) => {
      // Display if friend request worked
      if (err) {
        setStatus({ stat: "error", msg: err });
      }
    });
    console.log(status);
  };

  if (status.stat == "error") {
    statusComp = (
      <Alert sx={{ width: "95%", marginBottom: "10px" }} severity="error">
        {status.msg}
      </Alert>
    );
  } else if (status.stat == "sucess") {
    statusComp = (
      <Alert sx={{ width: "95%", marginBottom: "10px" }}>
        Friend request sent
      </Alert>
    );
  }

  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="close-btn">
          <Typography variant="h5">Add a Friend</Typography>
          <IconButton
            onClick={() => {
              setTrigger(false);
              statusComp = <div></div>;
            }}
          >
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
          {statusComp}
          <TextField
            fullWidth
            error={errorState}
            helperText={errorState ? "Please Enter a username" : ""}
            id="friend-username"
            label="Add a friend"
            name="friend-username"
            autoComplete="friend-username"
            onChange={(e) => {
              setSearch(e.target.value);
              if (search !== "") setErrorState(false);
              statusComp = <></>;
            }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Button
              sx={{ marginTop: "20px" }}
              variant="contained"
              onClick={addFriend}
            >
              Add
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  ) : (
    ""
  );
}

export default FriendPopUp;
