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

// TODO: Can send message to friends
// TODO: Display the messages to both parties

function Chat() {
  const [msg, setMsg] = useState("");

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
                  <IconButton onClick={() => console.log("sending msg")}>
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
