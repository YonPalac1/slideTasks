import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/userReducer";
import "./ProfilePopOver.scss";

export const ProfilePopOver = ({modalProfile}) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  useEffect(()=>{
  }, [modalProfile])

  return (
    <div className={modalProfile === 1 ? "profile-pop-over active" : "profile-pop-over"} >
      <div className="profile-pop-over-container">
        <div className="profile-pop-over-container__arrow"></div>
        <ul>
          <li>
            <p>{user.name}</p>
          </li>
          <li>
            <p>{user.email}</p>
          </li>
          <li>
            <Link className="profile-button" to="/profile">
              View Profile
            </Link>
          </li>
          <li>
            <button onClick={logout} className="log-out-button">
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
