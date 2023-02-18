import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Container,
  IconButton,
  FormControl,
  TextField,
  Typography,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Box,Grid
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const URL = "http://127.0.0.1:8000/auth/owner_registration/";
const SignUp = () => {
  const navigate = useNavigate();
  const [isSignedUp, setSignedUp] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit =(data) => {
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

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postdata),
    })
      .then((response) => 
      {
      if (response.status === 201) {
        alert('User registered successfully!');
        return response.json();
      } else if (response.status === 400) {
        alert('Bad request. Please fill in all the required fields');
      } else if (response.status === 409) {
        alert('Conflict. User with that email or username already exists');
      } else {
        alert('An error occurred while registering the user');
      }
    }).then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    reset();
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <Container
      component="main"
      maxWidth="500px"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          variant="h5"
          style={{
            fontWeight: "600",
            fontFamily: "Arial ",
          }}
        >
          Welcome to <span style={{ color: "blue" }}>Rental Application</span>        
        </Typography >
        <Typography align="center"
          gutterBottom
          marginTop="5%"
          variant="h6"
          style={{
            fontWeight: "600",
            fontFamily: "Arial ",
          }}>Sign Up</Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <FormControl style={{ width: "100%" }}>
            <TextField
              required
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
              error={errors.email ? true : false}
              helperText={errors.email && "Enter Valid Email"}
              fullWidth
              margin="normal"
            />
            <TextField
              type={showPassword ? "text" : "password"}
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
                placeholder: "Password",
              }}
              {...register("password", { required: true, minLength: 6 })}
              error={errors.password ? true : false}
              helperText={errors.password && "Set a Strong Password"}
              margin="normal"
              fullWidth
            />

            <TextField
              required
              placeholder="First Name"
              name="first_name"
              {...register("first_name", { required: true })}
              error={errors.first_ame ? true : false}
              helperText={errors.fName && "Valid Name please"}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              placeholder="Last Name"
              {...register("last_name", { required: true })}
              error={errors.last_name ? true : false}
              helperText={errors.lName && "Valid Last Name please"}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              type="number"
              placeholder="Phone Number"
              {...register("phone_number", { required: true })}
              error={errors.pNum ? true : false}
              helperText={errors.lName && "Valid Last Name please"}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              type="number"
              placeholder="Age"
              {...register("age", { required: true })}
              error={errors.age ? true : false}
              helperText={errors.age && "Valid Last Name please"}
              margin="normal"
              fullWidth
            />
            <FormControl variant="standard">
              <InputLabel>Gender</InputLabel>
              <Select
                placeholder="Gender"
                name="Gender"
                defaultValue={""}
                {...register("gender", { required: true })}
              >
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
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
          </Grid>
        </Grid>
      </Box>
    </Container>
    // <Container
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //   }}
    // >
    //   <Typography variant="h4" align="center" gutterBottom marginTop="5%">
    //     SignUp
    //   </Typography>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <FormControl>
    //       <TextField
    //         required
    //         placeholder="Email"
    //         {...register("email", {
    //           required: true,
    //           pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    //         })}
    //         error={errors.email ? true : false}
    //         helperText={errors.email && "Enter Valid Email"}
    //         variant="standard"
    //       />
    //       <TextField
    //         type={showPassword ? "text" : "password"}
    //         required
    //         InputProps={{
    //           endAdornment: (
    //             <InputAdornment position="end">
    //               <IconButton
    //                 aria-label="toggle password visibility"
    //                 onClick={handleClickShowPassword}
    //                 edge="end"
    //               >
    //                 {showPassword ? <VisibilityOff /> : <Visibility />}
    //               </IconButton>
    //             </InputAdornment>
    //           ),
    //           placeholder: "Password",
    //         }}
    //         {...register("password", { required: true, minLength: 6 })}
    //         error={errors.password ? true : false}
    //         helperText={errors.password && "Set a Strong Password"}
    //         variant="standard"
    //       />

    //       <TextField
    //         required
    //         placeholder="First Name"
    //         name="first_name"
    //         {...register("first_name", { required: true })}
    //         error={errors.first_ame ? true : false}
    //         helperText={errors.fName && "Valid Name please"}
    //         variant="standard"
    //       />
    //       <TextField
    //         required
    //         placeholder="Last Name"
    //         {...register("last_name", { required: true })}
    //         error={errors.last_name ? true : false}
    //         helperText={errors.lName && "Valid Last Name please"}
    //         variant="standard"
    //       />
    //       <TextField
    //         required
    //         type="number"
    //         placeholder="Phone Number"
    //         {...register("phone_number", { required: true })}
    //         error={errors.pNum ? true : false}
    //         helperText={errors.lName && "Valid Last Name please"}
    //         variant="standard"
    //       />
    //       <TextField
    //         required
    //         type="number"
    //         placeholder="Age"
    //         {...register("age", { required: true })}
    //         error={errors.age ? true : false}
    //         helperText={errors.age && "Valid Last Name please"}
    //         variant="standard"
    //       />

    //       <FormControl variant="standard">
    //         <InputLabel>Gender</InputLabel>
    //         <Select
    //           placeholder="Gender"
    //           name="Gender"
    //           defaultValue={""}
    //           {...register("gender", { required: true })}
    //         >
    //           <MenuItem value={"M"}>Male</MenuItem>
    //           <MenuItem value={"F"}>Female</MenuItem>
    //         </Select>
    //       </FormControl>

    //       <Button
    //         variant="contained"
    //         color="success"
    //         style={{ margin: "5%" }}
    //         type="submit"
    //       >
    //         Sign Up
    //       </Button>
    //     </FormControl>
    //   </form>
    //   <p style={{ textAlign: "center" }}>
    //     Already a user? Click{" "}
    //     <span
    //       onClick={() => {
    //         navigate("/");
    //       }}
    //       style={{
    //         color: "red",
    //         cursor: "pointer",
    //         textDecoration: "underline",
    //       }}
    //     >
    //       here
    //     </span>
    //   </p>
    // </Container>
  );
};

export default SignUp;
