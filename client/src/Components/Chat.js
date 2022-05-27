import "../Chat.css";
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
import * as Api from "../Api/api";
import io from "socket.io-client";

function Chat() {
  const ENDPOINT = "http://localhost:5000";
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const socket = io(ENDPOINT);
  }, []);

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
              <IconButton>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        onClick={async () => {
          const tt = await Api.test();
          console.log(tt);
        }}
      >
        tests
      </Button>
    </div>
  );
}

export default Chat;
