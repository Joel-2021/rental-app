import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import AuthContext from "../Context";
import { useNavigate } from "react-router-dom";
const URL="http://127.0.0.1:8000/auth/logout/"

const Header = (props) => {
  const navigate=useNavigate()
  const {Logout}= useContext(AuthContext)
  //dark SKy 5B8FB9
  //Navy 301E67
const access=localStorage.getItem('token')
const logout = async () => {
  try {
    const token = localStorage.getItem("token"); // get token from localStorage
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // include token in Authorization header
      },
    });
    if (response.ok) {
      Logout()
      localStorage.removeItem("token"); // remove token from localStorage
      console.log("Logged out successfully");
    } else {
      console.log("Logout failed");
    }
  } catch (error) {
    console.log(error.message);
  }
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
            onClick={()=>navigate('/home')}
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
