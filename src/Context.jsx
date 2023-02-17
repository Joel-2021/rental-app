import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    if (isLoggedIn) navigate("/home");
    if (!isLoggedIn) navigate("/");
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  function Login() {
    setIsLoggedIn(true);
  }
  function Logout() {
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        Login,
        Logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
