import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faUser,
  faF,
  faG,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Login.scss";
import useForm from "../../hooks/useForm";
import { loginAction } from "../../redux/userReducer";

export const Login = () => {
  const dispatch = useDispatch();
  const [formValues, handleChange] = useForm({
    email: "",
    password: "",
  });
  const [check, setCheck] = useState(false)
  const { email, password } = formValues;

  const handleCheck = (e) => {
    if (e.target.checked) {
      setCheck(true)
    } else {
      setCheck(false)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAction(formValues, check));
  };

  return (
    <div>
      <Navbar />
      <h2 className="login-title">Login to your Account</h2>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <div className="login-container-left">
            <div>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="login-container_icon"
                size="lg"
              />
              <input
                type="email"
                placeholder="email@gmail.com"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <FontAwesomeIcon
                icon={faKey}
                className="login-container_icon"
                size="lg"
              />
              <input
                type="password"
                placeholder="**************"
                required
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="login-container_button">
              <button type="submit">Log in</button>
            </div>
            <label>
              <input type="checkbox" name="remember" onChange={handleCheck} />
              Remember me!
            </label>
          </div>
        </form>
        <div className="login-container-right">
          <div>
            <FontAwesomeIcon
              icon={faG}
              className="login-container_icon"
              size="lg"
            />
            <button>Sign in with Google</button>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faF}
              className="login-container_icon"
              size="lg"
            />
            <button>Sign in with Facebook</button>
          </div>
          <div>
            <Link to="/register" className="login-container_text">Register</Link>
          </div>
          <label>ª</label>
        </div>
      </div>
    </div>
  );
};
