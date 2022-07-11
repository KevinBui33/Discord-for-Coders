import React from "react";

import { Avatar, Grid, TextField, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#424549",
  color: "#fff",
}));

const FriendListItem = ({ item, index }) => {
  return <div>{item.username}</div>;
};

export default FriendListItem;
