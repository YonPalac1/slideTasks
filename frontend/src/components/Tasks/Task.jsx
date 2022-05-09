import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faCodeFork, faPlus } from "@fortawesome/free-solid-svg-icons";

import { getTaskAction, strictAction } from "../../redux/tasksReducer";
import { modalAction } from "../../redux/projectsReducer";
import "./cardTask.scss";

export const Task = ({ tasks, colId }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(tasks);
  const strickTask = useSelector(state => state.tasks.strickTask)
  const columns = useSelector((state) => state.projects.columns);

  useEffect(() => {
    setState(tasks);
  }, [tasks]);

  useEffect(() => {}, [columns])

  const chargeInfo = (task) => {
    dispatch(getTaskAction(task));
    dispatch(modalAction(true));
  };

  const strictMode = (id) => {
    dispatch(strictAction(id))
  }

  return (
    <ReactSortable
      list={state}
      setList={setState}
      group="groupName"
      animation={200}
      delayOnTouchStart={true}
      delay={2}
      className="cards-container"
    >
      {!tasks ? (
        <></>
      ) : (
        state.map((task) => {
          return (
            <div className={`card-task ${strickTask === task.id && 'active'}`} key={task.id}>
              <div className="task-title">
                <span>{task.name}</span>
                <button className="icon-fire" onClick={()=>strictMode(task.id)}>
                  <FontAwesomeIcon icon={faFire} />
                </button>
              </div>
              <div className="sub-tasks">
                <button className="icon-show">
                  <FontAwesomeIcon icon={faCodeFork} />
                </button>
                <button className="icon-show" onClick={() => chargeInfo(task)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          );
        })
      )}
    </ReactSortable>
  );
};
