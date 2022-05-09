import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAction } from "../../redux/userReducer";
import { Navbar } from "../../components/Navbar/Navbar";
import useForm from "../../hooks/useForm";

export const Register = () => {
  const dispatch = useDispatch();
  const [formValues, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formValues;
  const [errorPasswordRepeat, setErrorPasswordRepeat] = useState();
  const pass1 = useRef();

  const handleChange2 = (e) => {
    setErrorPasswordRepeat(
      pass1.current?.value !== e.target.value
        ? "Las contraseñas no coinciden"
        : ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAction(formValues));
  };

  return (
    <div>
      <Navbar />
      <h1 className="login-title">Login to your Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-container">
          <div className="login-container-left">
            <div>
              <FontAwesomeIcon
                icon={faUser}
                className="login-container_icon"
                size="lg"
              />
              <input
                name="name"
                value={name}
                onChange={handleChange}
                type="name"
                placeholder="Nombre de usuario"
              />
            </div>
            <div>
              <FontAwesomeIcon
                icon={faKey}
                className="login-container_icon"
                size="lg"
              />
              <input
                name="password"
                value={password}
                onChange={handleChange}
                ref={pass1}
                type="password"
                placeholder="Contraseña"
                required
              />
            </div>
            <div>
              <FontAwesomeIcon
                icon={faKey}
                className="login-container_icon"
                size="lg"
              />
              <Link to="/login">Ya tengo una cuenta</Link>
            </div>
          </div>

          <div className="login-container-right">
            <div>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="login-container_icon"
                size="lg"
              />
              <input
                name="email"
                value={email}
                onChange={handleChange}
                type="email"
                placeholder="email@gmail.com"
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
                name="password_repeat"
                onChange={handleChange2}
                type="password"
                placeholder="Repetir contraseña"
                required
              />
            </div>
            <span>{errorPasswordRepeat}</span>
            <div>
              <FontAwesomeIcon
                icon={faKey}
                className="login-container_icon"
                size="lg"
              />
              <input type="submit" value="registrate" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
