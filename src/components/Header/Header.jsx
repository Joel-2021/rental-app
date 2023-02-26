import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Container, Button, createTheme } from "@mui/material";
import AuthContext from "../../Context";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

const URL = "http://18.118.136.253:8005/auth/logout/";
const theme=createTheme({
  typography: {
    "fontFamily": `"Poppins" , sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
   }
})
const Header = (props) => {
  const navigate = useNavigate();
  const { Logout } = useContext(AuthContext);
  //dark SKy 5B8FB9
  //Navy 301E67
  const logout = async () => {
    try {
      const token = localStorage.getItem("token"); // get token from localStorage
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // include token in Authorization header
        },
      });
      if (response.ok) {
        Logout();
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
    <ThemeProvider theme={theme}>

    <AppBar position="static" style={{ background: "white" }}>
      <Container maxWidth="xl">
        <Toolbar
          style={{ display: "flex", justifyContent: "space-between" }}
          disableGutters
        >
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              // fontFamily: "monospace",
              fontWeight: 800,
              letterSpacing: ".1rem",
              color: "#537FE7",
              "&:hover": {
                cursor: "pointer",
              },
            }}
        
            onClick={() => navigate("/home")}
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
              // fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              textDecoration: "none",
              color: "#537FE7",
            }}
           
          >
            Property Manager
          </Typography>
          <Button
            variant="contained"
            onClick={logout}
            className="logout"
            sx={{ 
              width: { xs: "80px",lg:'100px' }, 
              height:{xs:"30px",lg:'40px'},
              fontSize:{xs:'10px',lg:'13px'},
              backgroundColor:"#f87575",
              "&:hover":{
                color:'#f87575',
                background:'white',
                border:'1px solid #f87575'
              }
            }}
            
          >
            Log Out
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
                </ThemeProvider>
  );
};

export default Header;
