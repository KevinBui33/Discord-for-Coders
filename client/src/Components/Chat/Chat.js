import "./Chat.css";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext, useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import Header from "../Header";
import * as api from "../../Api/api";
import { SocketContext } from "../../Context/SocketProvider";

// TODO: Can send message to friends
// TODO: Display the messages to both parties

function Chat() {
  const [msg, setMsg] = useState("");
  const socket = useContext(SocketContext);

  return (
    <div className="App">
      <div className="ChatBox">
        <div className="chat">
          <ChatWindow />
          <FormControl fullWidth>
            <OutlinedInput
              id="outlined-adornment-weight"
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              placeholder="Enter Text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={async () => {
                      console.log("sending msg");
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default Chat;
