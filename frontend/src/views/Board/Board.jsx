import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Columns } from "../../components/Boards/Columns";
import Pomodoro from "../../components/Pomodoro/Pomodoro";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { getProjectAction } from "../../redux/projectsReducer";
import "./board.scss";

export const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector(state => state.projects.project);

  useEffect(() =>{
    dispatch(getProjectAction(id))
  }, [id])

  return (
    <div>
      <div className="board-container">
        <Sidebar name={project.name} />
        <Columns />
      </div>
      <Pomodoro />
    </div>
  );
};
