import React from "react";
import { AppBar, Box, Button, Container, Menu, Toolbar } from "@mui/material";

// TODO: Show the clicked person (who they are looking at rn) on the bar

function Header() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Box sx={{ display: { md: "flex" } }}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
