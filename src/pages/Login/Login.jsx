import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Alert
} from "@mui/material";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context";

const Login = () => {
  const URL = "http://127.0.0.1:8000/auth/login/";
  const { isLoggedIn, Login } = useContext(AuthContext);
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
        credentials:'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        Login();
        console.log(response)
        console.log("loggedIN");
      } else {
        alert("Wrong username or password");
        console.log("Invalid Email or password");
      }
    } catch (error) {
      console.log(error.message);
    }

    fetch("http://127.0.0.1:8000/property/user_property/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
       console.log(response)
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom marginTop="5%">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
            error={errors.email ? true : false}
            helperText={errors.email && "Enter Valid Email"}
            variant="standard"
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
            helperText={errors.password && "Password length should be more than 5"}
            variant="standard"
          />
          <Button
            variant="contained"
            color="success"
            style={{ margin: "5%" }}
            type="submit"
          >
            Login
          </Button>
        </FormControl>
      </form>
      <p
        onClick={() => {
          navigate("/signup");
        }}
        style={{ textAlign: "center", cursor: "pointer", color: "red" }}
      >
        Sign In?
      </p>
    </Container>
  );
};

export default Login;
