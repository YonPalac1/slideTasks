import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  createProjectAction,
  allProjectsAction,
} from "../../redux/projectsReducer";
import useForm from "../../hooks/useForm";
import "./ProjectsPopOver.scss";

export const ProjectsPopOver = ({ popOver }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const user = useSelector((state) => state.user.user);
  const [formValues, handleChange, reset] = useForm({
    name: "",
  });
  const { name } = formValues;

  useEffect(() => {
    async function getAllProjects() {
      await dispatch(allProjectsAction(user.id));
    }
    getAllProjects();
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.name !== "") {
      dispatch(createProjectAction(formValues, user.id));
    }
    reset();
  };

  return (
    <div
      className={popOver === 3 ? "profile-pop-over active" : "profile-pop-over"}
    >
      <div className="project-pop-over-container">
        <div className="project-pop-over-container__arrow"></div>
        <ul>
          {!projects.length ? (
            <li>No hay projectos agregados</li>
          ) : (
            projects.map((project) => {
              return (
                <li key={project.id}>
                  <Link to={`/boards/${project.id}`}>{project.name}</Link>
                </li>
              );
            })
          )}
          <li>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Add new project"
                value={name}
                onChange={handleChange}
              ></input>
              <button type="submit">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="lg"
                  className="faBriefcase-icon"
                />
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};
