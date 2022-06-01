import "./Chat.css";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import Header from "../Header";
import SideBar from "../SideBar";
import * as api from "../../Api/api";
import socket from "../../Service/socket";

function Chat() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    console.log("Connecting user");
    socket.emit("join");
  }, []);

  const sendMsg = () => {
    socket.emit("send_msg", { msg });
  };

  return (
    <div className="App">
      <Header />
      <div className="ChatBox">
        <SideBar />
        <div className="chat">
          <ChatWindow />
          <FormControl fullWidth>
            <OutlinedInput
              id="outlined-adornment-weight"
              onChange={(e) => {
                setMsg(e.target.value);
                console.log(msg);
              }}
              placeholder="Enter Text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={sendMsg}>
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
