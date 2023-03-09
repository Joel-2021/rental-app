import React, { useContext,useState } from "react";
import Header from "../../components/Header/Header";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility,VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { changePassword } from "../../Fetch/FetchData";
import AuthContext from "../../Context";
const Account = () => {
  const { Logout } = useContext(AuthContext);
  const [showPassword,setShowPassword]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onSubmit(data, e) {
    e.preventDefault();
    changePassword(data, Logout);
    console.log(data);
  }
  function handleClickShowPassword(){
    setShowPassword(prev=>!prev)
  }
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ padding: "10px" }}>
          <Typography variant="h5" fontFamily={"poppins"} gutterBottom>
            Change Password
          </Typography>
          <ul style={{ paddingLeft: "20px" }}>
            <li>
              {" "}
              <Typography variant="subtitle2" fontFamily={"roboto"}>
                Password should be AlphaNumeric
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle2">
                Password should have more than 7 characters
              </Typography>
            </li>
            <li>
              {" "}
              <Typography variant="subtitle2">
                Password should have not be common like 12345678 or 1234qwerty
              </Typography>
            </li>
            <li>
              {" "}
              <Typography variant="subtitle2">
                Once Password is changed you will automatically be logged out
              </Typography>
            </li>
          </ul>

          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingTop: "10px",
              width: { xs: "100%", sm: "50%" },
            }}
          >
            <TextField
              label="Current Password"
              type="password"
              {...register("current_password", { required: true })}
            />
            <TextField
              label="New Password"
              {...register("new_password", {
                required: true,
                minLength: 8,
                pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9\s\S]*$/,
              })}
              error={errors.new_password ? true : false}
              type= {showPassword?'text':'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" sx={{ width: "20%" }}>
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Account;
