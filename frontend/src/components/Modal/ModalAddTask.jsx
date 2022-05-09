import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskAction, deleteTaskAction, editTaskAction, getTaskAction } from "../../redux/tasksReducer";
import { Backdrop } from "./Backdrop";
import "./ModalAddTask.scss";
import { modalAction } from "../../redux/projectsReducer";
import { ConfirmAlert } from '../Alert/index';


export const ModalAddTask = ({ info }) => {
  const dispatch = useDispatch();
  const id_column = useSelector((state) => state.projects.id_column);
  const initialForm = [{
    name: "",
    description: "",
    end_date: new Date(),
    start_date: new Date(),
    priority: 0,
  }];
  const [form, setForm] = useState(initialForm[0]);

  useEffect(() => {
    if (!info[0] && info[0] == undefined) {
      setForm(initialForm[0]);
    } else {
      setForm(info[0]);
    }
  }, [info]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(info[0]){
      dispatch(editTaskAction(form, info[0].id));
    } else {
      dispatch(addTaskAction(form, id_column));
    }
    dispatch(modalAction(false))
  };

  const deleteTask = (id) => {
    ConfirmAlert('¿Está seguro que desea eliminar esta tarea?', '').then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTaskAction(id))
      }
    })
  }

  return (
    <div>
      <Backdrop />
      <div className="modal-back">
        <div className="modal-add-task_container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <input
              type="number"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            />
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
            />
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
            />
            <button type="submit">Subir</button>
            {info.length ? <button onClick={() => deleteTask(info[0].id)}>Delete Task</button> : ""}
          </form>
        </div>
      </div>
    </div>
  );
};
