import React from "react";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addColumnAction } from "../../redux/projectsReducer";
import "./addColumn.scss";

export const AddColumn = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const addColumn = () => {
    dispatch(addColumnAction(id))
  }

  return (
    <div className="add-column">
      <button onClick={addColumn}>Add new column +</button>
    </div>
  );
};
