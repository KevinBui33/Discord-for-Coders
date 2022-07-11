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
import "./FriendPopUp.css";
import { SocketContext } from "../../Context/SocketProvider";

function FriendPopUp({ trigger, setTrigger }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState({});
  const [errorState, setErrorState] = useState(false);
  const socket = useContext(SocketContext);

  let statusComp;

  const addFriend = async (data) => {
    if (search === "") return setErrorState(true);

    console.log(`Sending friend request to ${search}`);

    // Send friend request to another user VIA api (not socket io)
    // close tab on sucess
    socket.emit("send_friend_request", search, (response) => {
      console.log(response);

      if (response.done) {
        setStatus({ stat: "sucess" });
      } else {
        setStatus({ stat: "error", msg: response.err });
      }
    });
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
              setStatus({});
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
