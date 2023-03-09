import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import PropertyList from "../../components/PropertyList";
import { Snackbar, Alert } from "@mui/material";
import AuthContext from "../../Context";

const Home = () => {
  const { isAdded, isDeleted } = useContext(AuthContext);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };
  return (
    <>
      <Header />
      <PropertyList />
      <Snackbar open={isAdded} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          New Property Added!
        </Alert>
      </Snackbar>
      <Snackbar open={isDeleted} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Property Deleted!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
