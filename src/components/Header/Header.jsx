import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Container,
  Box,
  Avatar,
  Tooltip,
  Menu,
  IconButton,
  Button,
  createTheme,
} from "@mui/material";
import AuthContext from "../../Context";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import {UserLogout} from '../../Fetch/FetchData'


const theme = createTheme({
  typography: {
    fontFamily: `"Poppins" , sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
const Header = () => {
  const navigate = useNavigate();
  const { Logout } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout=()=>{
    UserLogout(Logout)
  }
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
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".1rem",
                textDecoration: "none",
                color: "#537FE7",
              }}
              onClick={() => navigate("/home")}
            >
              Property Manager
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{backgroundColor:'#537FE7'}}/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                 <MenuItem onClick={handleCloseUserMenu}>
                   <Typography onClick={()=>navigate('/account')}>Account</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    className="logout"
                    sx={{
                      width: { xs: "80px", lg: "100px" },
                      height: { xs: "30px", lg: "40px" },
                      fontSize: { xs: "10px", lg: "13px" },
                      backgroundColor: "#f87575",
                      "&:hover": {
                        color: "#f87575",
                        background: "white",
                        border: "1px solid #f87575",
                      },
                    }}
                  >
                    Log Out
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
            {/* <Button
              variant="contained"
              onClick={logout}
              className="logout"
              sx={{
                width: { xs: "80px", lg: "100px" },
                height: { xs: "30px", lg: "40px" },
                fontSize: { xs: "10px", lg: "13px" },
                backgroundColor: "#f87575",
                "&:hover": {
                  color: "#f87575",
                  background: "white",
                  border: "1px solid #f87575",
                },
              }}
            >
              Log Out
            </Button> */}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
