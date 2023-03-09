import React, { useEffect, useContext } from "react";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Details from "./pages/Details/Details";
import { Route, Routes} from "react-router-dom";
import Account from "./pages/Account/Account";
import Home from "./pages/Home/Home";
import AuthContext from "./Context";
function App() {
  const { isLoggedIn} = useContext(AuthContext);
  useEffect(() => {
    window.history.pushState(null, null, "/");
    window.onpopstate = (event) => {
      if (!isLoggedIn) {
        window.history.pushState(null, null, "/");
        return;
      }
      const { pathname } = window.location;
      if (pathname === "/" || pathname === "/signup") {
        window.history.pushState(null, null, "/home");
        return;
      }
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/account" element={<Account />} />
      <Route path="/home/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
