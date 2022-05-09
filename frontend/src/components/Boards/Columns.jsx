import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ReactSortable } from "react-sortablejs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { AddColumn } from "./AddColumn";
import { Task } from "../Tasks/Task";
import { ModalAddTask } from "../Modal/ModalAddTask";
import { getColumnAction, modalColumnAction } from "../../redux/projectsReducer";
import { modalAction } from "../../redux/projectsReducer";

import "./columns.scss";
import { getTaskAction } from "../../redux/tasksReducer";
import { ModalColumn } from "../Modal/ModalColumn";

export const Columns = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.projects.modal);
  const columns = useSelector((state) => state.projects.columns);
  const taskToEdit = useSelector((state) => state.tasks.task);
  const tasksToColumn = useSelector((state) => state.tasks.tasks);
  const activeModalColumn = useSelector(state => state.projects.modalColumn);
  const [nameColumn, setNameColumn] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getColumnAction(id));
  }, [id, tasksToColumn]);

  useEffect(() => {
  }, [columns, tasksToColumn]);

  const openModal = (id) => {
    dispatch(modalAction(true, id));
  };

  /* Delete column */
  const handleSettings = (name) => {
    setNameColumn(name);
    dispatch(modalColumnAction(!activeModalColumn))
  };


  return (
    <div className="boards-container">
      <div className="board-container_body">
        {!columns ? (
          <></>
        ) : (
          columns.map((col) => {
            return (
              <div className="boards-column" key={col.id}>
                <button
                  onClick={() => handleSettings(col)}
                  className="button-settings"
                >
                  <FontAwesomeIcon icon={faGear} />
                </button>
                <h2>{col.name}</h2>

                <Task tasks={col.tasks} colId={col.id} />

                <div className="column-footer">
                  <button onClick={() => openModal(col.id)}>
                    <span>add new task</span>+
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      {activeModalColumn ? (
        <>
          <div className="modal-backdrop" onClick={handleSettings}></div>
          <ModalColumn name={nameColumn.name} id={nameColumn.id} />
        </>
      ) : (
        ""
      )}
      <AddColumn />
      {modal && <ModalAddTask info={taskToEdit} />}
    </div>
  );
};
