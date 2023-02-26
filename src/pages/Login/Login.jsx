import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Box,
  Grid
} from "@mui/material";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context";

const Login = () => {
  const URL="http://18.118.136.253:8005/auth/login";
  const { Login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  function handleClickShowPassword() {
    setShowPassword((prev) => !prev);
  }
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const jsonData = await response.json(); // parse response body as JSON
        Login();
        let token = jsonData.Token.access;
        localStorage.setItem("token", token);
        console.log("loggedIN");
      } else {
        alert("Wrong username or password");
        console.log("Invalid Email or password");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container
    maxWidth="500px"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        align="center"
        gutterBottom
        marginTop="5%"
        component="h1"
        variant="h5"
        style={{
          fontWeight: "600",
          fontFamily: "Arial ",
        }}
      >
        Welcome to <span style={{ color: "blue" }}>Rental Application,</span>
      </Typography>
      <Typography align="center"
          gutterBottom
          marginTop="5%"
          variant="h6"
          style={{
            fontWeight: "600",
            fontFamily: "Arial ",
          }}>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <FormControl style={{ width: "100%" }}>
          <TextField
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
            error={errors.email ? true : false}
            helperText={errors.email && "Enter Valid Email"}
            style={{ paddingBottom: "16px" }}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              placeholder: "Password",
            }}
            {...register("password", { required: true, minLength: 6 })}
            error={errors.password ? true : false}
            helperText={
              errors.password && "Password length should be more than 5"
            }
          />
          <Button variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
            Login
          </Button>
        </FormControl>
      </form>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px",
        }}
      >
        <Grid
          item
          variant="body2"
          style={{
            fontSize: "15px",
            fontWeight: "600",
            fontFamily: "Helvetica",
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
            }}
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Sign Up
          </span>
        </Grid>
      </Grid>
    </Box>
  </Container>
  );
};

export default Login;
