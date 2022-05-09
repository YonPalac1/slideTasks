import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileImage from "./profileblue.jpg";
import "./profile.scss";
import { editAction, sesionAction } from "../../redux/userReducer";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const formValues = {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  };
  const [form, setForm] = useState({});
  const [active, setActive] = useState(false);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (value) => {
    let button = document.querySelector(`#${value}`);
    let input = document.querySelector(`input#${value}_input`);

    if (!active) {
      input.removeAttribute("disabled");
      setActive(true);
    } else {
      dispatch(editAction(form));
      input.setAttribute("disabled", "");
      setActive(false);
    }
  };

  return (
    <div className="container_align_profile">
      <div className="container_profile_form">
        <div className="container_profile_image">
          <img
            className="container_profile_image_img"
            src={profileImage}
            alt="no-foto"
          />
        </div>

        <div className="container_profile_input ic1">
          <input
            id="name_input"
            name="name"
            className="profile_input"
            type="text"
            placeholder=""
            value={form.name}
            onChange={handleChange}
            disabled
          />
          <div className="cut"></div>
          <label htmlFor="firstname" className="profile_placeholder">
            First name
          </label>
          <input
            type="button"
            className="edit"
            onClick={(value) => handleEdit("name")}
            id="name"
            value="edit"
          />
        </div>

        <div className="container_profile_input ic1">
          <input
            id="email_input"
            name="email"
            className="profile_input"
            type="text"
            placeholder=" "
            value={form.email}
            onChange={handleChange}
            disabled
          />
          <div className="cut"></div>
          <label htmlFor="email" className="profile_placeholder">
            E - Mail
          </label>
          <input
            type="button"
            className="edit"
            onClick={(value) => handleEdit("email")}
            id="email"
            value="edit"
          />
        </div>

        <div className="container_profile_input ic1">
          <input
            id="password_input"
            name="password"
            className="profile_input"
            type="password"
            placeholder=" "
            value={form.password}
            onChange={handleChange}
            disabled
          />
          <div className="cut"></div>
          <label htmlFor="firstname" className="profile_placeholder">
            Password
          </label>
          <input
            type="button"
            className="edit"
            onClick={(value) => handleEdit("password")}
            id="password"
            value="edit"
          />
        </div>

        <button className="button_profile_delete">Delete User</button>
      </div>
    </div>
  );
}

export default Profile;
