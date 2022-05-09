import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Board } from "../views/Board/Board.jsx";
import { Home } from "../views/Home/Home";
import Profile from "../views/Profile/Profile";
import { Login } from "../views/Login/Login";
import { Register } from "../views/Register/Register";
import { sesionAction } from "../redux/userReducer.js";

export const AppRouter = () => {
  const logged = useSelector((state) => state.user.ok);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const userLogged = window.localStorage.getItem("user")
    if (userLogged) {
      dispatch(sesionAction(userLogged))
    }
    
  }, [logged])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/:id" element={<Board />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={!logged ? <Login /> : <Navigate to="/" ></Navigate>} />
        <Route path="/register" element={!logged ? <Register /> : <Navigate to="/" ></Navigate>} />
      </Routes>
    </Router>
  );
};
