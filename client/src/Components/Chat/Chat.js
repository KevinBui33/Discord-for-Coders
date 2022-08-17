import "./Chat.css";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext, useEffect, useState } from "react";

import { SocketContext } from "../../Context/SocketProvider";

const testMessages = [
  { name: "www", message: "hello" },
  { name: "lll", message: "hello" },
  { name: "lll", message: "you got a big dumpy" },
  { name: "lll", message: "🥵" },
  { name: "www", message: "you 2" },
  { name: "www", message: "I like it" },
  { name: "lll", message: "thanks homie" },
  { name: "www", message: "np" },
  { name: "www", message: "hello" },
  { name: "lll", message: "hello" },
  { name: "lll", message: "you got a big dumpy" },
  { name: "lll", message: "🥵" },
  { name: "www", message: "you 2" },
  { name: "www", message: "I like it" },
  { name: "lll", message: "thanks homie" },
  { name: "www", message: "np" },
  { name: "www", message: "hello" },
  { name: "lll", message: "hello" },
  { name: "lll", message: "you got a big dumpy" },
  { name: "lll", message: "🥵" },
  { name: "www", message: "you 2" },
  { name: "www", message: "I like it" },
  { name: "lll", message: "thanks homie" },
  { name: "www", message: "np" },
];

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    setMessages(testMessages);
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <Typography variant="h5">some person</Typography>
      </div>
      <div className="chat-window-container">
        <div className="chat-window">
          <List style={{ maxHeight: 1100, overflow: "auto" }}>
            {messages.map((message) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <div className="message-content">
                  <ListItemText
                    primary={message.name}
                    secondary={message.message}
                  />
                </div>
              </ListItem>
            ))}
          </List>
        </div>
        <TextField
          fullWidth
          id="outlined-message"
          label="Message"
          type="message"
          onChange={(e) => setMsg(e.target.value)}
          InputProps={{
            endAdornment: <SendIcon />,
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
