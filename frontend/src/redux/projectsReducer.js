import axios from "axios";
import { useSelector } from "react-redux";

const PROJECTS = "PROJECTS";
const PROJECT = "PROJECT";
const CREATE_PROJECT = "CREATE_PROJECT";
const ADD_COLUMN = "ADD_COLUMN";
const EDIT_COLUMN = "EDIT_COLUMN";
const DELETE_COLUMN = "DELETE_COLUMN";
const COLUMNS = "COLUMNS";
const MODAL = "MODAL";
const MODAL_COLUMN = "MODAL_COLUMN";
const PROJECT_ID = "PROJECT_ID";

const dataInicial = {
  projects: [],
  project: [],
  columns: [],
  id_column: 0,
  id_project: 0,
  modal: false,
  modalColumn: false
};

export default function userReducer(state = dataInicial, action) {
  switch (action.type) {
    case PROJECTS:
      return { ...state, projects: action.payload };
    case PROJECT:
      return { ...state, project: action.payload };
      case CREATE_PROJECT:
      return { ...state, projects: [...state.projects, action.payload.data] };
    case COLUMNS:
      return { ...state, columns: action.payload };
    case ADD_COLUMN:
      return { ...state, columns: [...state.columns, action.payload.data] };
    
    case EDIT_COLUMN:
      const editColumn = state.tasks.filter(item => item.id !== action.payload.data.id)
      return { ...state, columns: editColumn} 
    case DELETE_COLUMN:
      let newData = state.columns.filter((data) => data.id !== action.payload);

      return { ...state, columns: newData };
    case MODAL:
      return {
        ...state,
        modal: action.payload[0],
        id_column: action.payload[1],
      };
    case MODAL_COLUMN:
      return { ...state, modalColumn: action.payload}
    case PROJECT_ID:
      return { ...state, id_project: action.payload };
    default: {
      return state;
    }
  }
}

/* General */
export const allProjectsAction = (id) => async (dispatch) => {
  try {
    const projects = await axios.get(
      `http://localhost:3001/api/get/projects/${id}`
    );
    dispatch({
      type: PROJECTS,
      payload: projects.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createProjectAction = (data, id) => async (dispatch) => {
  try {
    const json = JSON.stringify(data);
    const res = await axios.post(
      `http://localhost:3001/api/create/project/${id}`,
      json,
      {
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    dispatch({
      type: CREATE_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const getProjectAction = (id) => async (dispatch) => {
  try {
    const projects = await axios.get(
      `http://localhost:3001/api/get/project/${id}`
    );
    dispatch({
      type: PROJECT,
      payload: projects.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addColumnAction = (id) => async (dispatch) => {
  try {
    const column = await axios.post(
      `http://localhost:3001/api/create/columns/${id}`,
      {
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    dispatch({
      type: ADD_COLUMN,
      payload: column.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editColumnAction = (data, id) => async (dispatch) => {
  try {
    const json = JSON.stringify(data);
    console.log(id)
    const column = await axios.put(
      `http://localhost:3001/api/update/columns/${id}`, json, 
      {
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      }
    );
    dispatch({
      type: ADD_COLUMN,
      payload: column.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getColumnAction = (id) => async (dispatch) => {
  dispatch({
    type: PROJECT_ID,
    payload: id,
  });
  try {
    const columns = await axios.get(
      `http://localhost:3001/api/get/columns/${id}`
    );
    dispatch({
      type: COLUMNS,
      payload: columns.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteColumnAction = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/api/delete/columns/${id}`);
    dispatch({
      type: DELETE_COLUMN,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const modalAction = (modal, id) => async (dispatch) => {
  dispatch({
    type: MODAL,
    payload: [modal, id],
  });
};
export const modalColumnAction = (data) => async (dispatch) => {
  dispatch({
    type: MODAL_COLUMN,
    payload: data,
  });
};
