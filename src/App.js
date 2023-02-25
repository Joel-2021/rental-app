import React, { useContext } from "react";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Details from "./pages/Details/Details";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/home" element={<Home />} />
      <Route path="/home/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
