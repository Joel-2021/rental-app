import React, { useContext, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  Container,
  Button,
  Avatar,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import AuthContext from "../Context";
const URL="http://127.0.0.1:8000/auth/logout/"

const Header = (props) => {
  const {Logout}= useContext(AuthContext)
  //dark SKy 5B8FB9
  //Navy 301E67
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
        Logout()
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch(error => {
        console.error(error);
      });

  };
  
  return (
    <AppBar position="static" style={{ background: "#03001c",display:'flex',justifyContent:'space-around' }}>
      <Container maxWidth="xl" >
        <Toolbar style={{display:'flex',justifyContent:'space-between' }} disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#B6EADA",
              textDecoration: "none",
            }}
          >
            Property Manager
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#B6EADA",
              textDecoration: "none",
            }}
          >
            Property Manager
          </Typography>
          <Button color="error" variant="contained" onClick={logout}>
        Log Out
      </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
