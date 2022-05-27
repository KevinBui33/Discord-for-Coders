import React from "react";
import { AppBar, Box, Button, Container, Menu, Toolbar } from "@mui/material";

const pages = ["your work", "projects", "filters"];

function Header() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Box sx={{ display: { md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
