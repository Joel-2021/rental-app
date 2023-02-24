import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdded,setIsAdded]=useState(null)
  const [isDeleted,setIsDeleted]=useState(null)
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
  function Added(){
    setIsAdded(true)
    setTimeout(()=>{
      setIsAdded(null)
    },3000)
  }
  function Deleted(){
    setIsDeleted(true)
    setTimeout(()=>{
      setIsDeleted(null)
    },3000)
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        Login,
        Logout,
        Added,
        Deleted,
        isAdded,
        isDeleted
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
