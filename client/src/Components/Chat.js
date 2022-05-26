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
import React, { useState } from "react";
import ChatWindow from "./ChatWindow";

function Chat() {
  const [msg, setMsg] = useState("");

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
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
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
