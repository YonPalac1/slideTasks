import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { ConfirmAlert } from "../Alert";
import { deleteColumnAction, editColumnAction, modalColumnAction } from "../../redux/projectsReducer";
import "./ModalColumn.scss";

export const ModalColumn = ({ name, id }) => {
  const dispatch = useDispatch();
  const initialForm = [{
    name: name,
  }];
  const [form, setForm] = useState(initialForm[0]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const deleteColumn = (id) => {
    ConfirmAlert("¿Está seguro que desea eliminar esta columna?", "").then(
      (result) => {
        if (result.isConfirmed) {
          dispatch(deleteColumnAction(id));
        }
      }
    );
    dispatch(modalColumnAction(false))
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(editColumnAction(form, id))
    dispatch(modalColumnAction(false))
  }

  return (
    
    <div className="modal-column_container">
      <form onSubmit={handleSubmit}>
        <input type="text" 
        name="name"
        value={form.name}
        onChange={handleChange} />
        <button >
          <FontAwesomeIcon icon={faPen} />
        </button>
      </form>
      <button
        className="delete-button_modal-column"
        onClick={() => deleteColumn(id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};
