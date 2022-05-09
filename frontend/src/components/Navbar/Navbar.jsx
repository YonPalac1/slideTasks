import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { allProjectsAction } from "../../redux/projectsReducer";
import { ProfilePopOver } from "./ProfilePopOver";
import { ProjectsPopOver } from "./ProjectsPopOver";
import { NotificationPopOver } from "./NotificationPopOver";

export const Navbar = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.user.ok);
  const user = useSelector((state) => state.user.user);
  const projects = useSelector((state) => state.projects.projects);
  const [active, setActive] = useState(0);

  useEffect(async () => {
    if (user) {
      await dispatch(allProjectsAction(user.id));
    }
  }, [user, active]);

  const openProfileModal = async (value) => {
    if (active === 0) {
      await setActive(value);
    } else if (active !== value) {
      setActive(value);
    } else if (active === value) {
      setActive(0);
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-container_title">
        <div className="navbar-container_tomato-icon"></div>
        <h1>SliceTasks</h1>
      </div>
      <ul>
        {logged ? (
          <>
            <li>
              <div className="navbar-container_projects">
                <FontAwesomeIcon
                  onClick={() => openProfileModal(3)}
                  icon={faBriefcase}
                  size="lg"
                  className="faBriefcase-icon"
                />
                <ProjectsPopOver popOver={active} />
              </div>
            </li>
            <li>
              <div className="navbar-container_notifications">
                <FontAwesomeIcon
                  onClick={() => openProfileModal(2)}
                  icon={faBell}
                  size="lg"
                />
                <NotificationPopOver popOver={active} />
              </div>
            </li>
            <li>
              <div
                onClick={() => openProfileModal(1)}
                className="navbar-container_profile"
              >
                <FontAwesomeIcon icon={faUser} size="xl" />
                <ProfilePopOver modalProfile={active} />
              </div>
            </li>
          </>
        ) : (
          ""
        )}
        {!logged ? (
          <li>
            <Link className="button-login" to="/login">
              Sign up
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};
