import React from "react";

import { Avatar, Grid, TextField, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#424549",
  color: "#fff",
}));

const FriendListItem = ({ item, index }) => {
  return (
    <StyledPaper
      sx={{
        my: 1,
        mx: "auto",
        p: 2,
      }}
      key={index}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Avatar>{item.username.charAt(0)}</Avatar>
        </Grid>
        <Grid item>
          <Typography>{item.username}</Typography>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default FriendListItem;
