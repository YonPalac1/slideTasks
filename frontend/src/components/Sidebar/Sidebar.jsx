import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import "./sidebar.scss";

export const Sidebar = ({ name }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-block">
        <div className="sidebar-info">
          <FontAwesomeIcon className="icon" icon={faFile} />
          <span>{name}</span>
          <p>Project description</p>
        </div>
        <div className="sidebar-contributors">
          <span>Contributors</span>
          <div className="users-list">
            <div className="users-icons"></div>
            <div className="users-icons"></div>
            <div className="users-icons"></div>
            <div className="users-icons"></div>
            <div className="users-icons"></div>
            <div className="users-icons"></div>
          </div>
        </div>
        <Link className="return-home" to="/">Home</Link>
      </div>
    </div>
  );
};
