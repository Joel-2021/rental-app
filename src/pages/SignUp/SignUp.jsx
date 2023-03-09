import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../Fetch/FetchData";

const URL = "http://localhost:8000/auth/owner_registration/";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const postdata = {
      email: data.email,
      password: data.password,
      profile: {
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        age: data.age,
        gender: data.gender,
      },
    };
    const csrfToken = getCookie("csrftoken");
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(postdata),
    })
      .then((response) => {
        if (response.status === 201) {
          alert("User registered successfully!");
          return response.json();
        } else if (response.status === 400) {
          alert("Bad request. Please fill in all the required fields");
        } else if (response.status === 409) {
          alert("Conflict. User with that email or username already exists");
        } else {
          alert("An error occurred while registering the user");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    reset();
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography
          align="center"
          variant="h5"
          style={{ fontWeight: "600", fontFamily: "Arial" }}
        >
          Welcome to <span style={{ color: "blue" }}>Rental Application</span>
        </Typography>
        <Typography
          align="center"
          variant="h6"
          style={{ fontWeight: "600", fontFamily: "Arial", marginTop: "2rem" }}
        >
          Sign Up
        </Typography>
        <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  label="Email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                  error={errors.email ? true : false}
                  helperText={errors.email && "Enter Valid Email"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label='Password'
                  {...register("password", { required: true, minLength: 6 })}
                  error={errors.password ? true : false}
                  helperText={errors.password && "Set a Strong Password"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                
                <TextField
                  required
                  variant="outlined"
                  label="First Name"
                  name="first_name"
                  {...register("first_name", { required: true })}
                  error={errors.first_ame ? true : false}
                  helperText={errors.fName && "Valid Name please"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant="outlined"
                  label="Last Name"
                  {...register("last_name", { required: true })}
                  error={errors.last_name ? true : false}
                  helperText={errors.lName && "Valid Last Name please"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  type="number"
                  label="Phone Number"
                  {...register("phone_number", { required: true })}
                  error={errors.pNum ? true : false}
                  helperText={errors.lName && "Valid Last Name please"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  type="number"
                  label="Age"
                  {...register("age", { required: true })}
                  error={errors.age ? true : false}
                  helperText={errors.age && "Valid Last Name please"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    name="Gender"
                    defaultValue={""}
                    {...register("gender", { required: true })}
                  >
                    <MenuItem value={"M"}>Male</MenuItem>
                    <MenuItem value={"F"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Typography
          align="center"
          variant="body2"
          style={{
            fontWeight: "600",
            fontFamily: "Helvetica",
            marginTop: "2rem",
          }}
        >
          Already a user? Click{" "}
          <span
            onClick={() => {
              navigate("/");
            }}
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            here
          </span>
        </Typography>
      </Box>
    </Container>
  );
};
export default SignUp;
