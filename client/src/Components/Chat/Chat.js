import "./Chat.css";
import {
  TextField,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import * as Api from "../../Api/api";
import socket from "../../Service/socket";

function Chat() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    socket.emit("join");
  }, []);

  const sendMsg = () => {
    socket.emit("send_msg", { msg });
  };

  return (
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
  );
}

export default Chat;
