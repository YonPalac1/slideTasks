import axios from "axios";

const ADD_TASK = "ADD_TASK";
const TASK_INFO = "TASK_INFO";
const EDIT_TASK = "EDIT_TASK";
const DELETE_TASK = "DELETE_TASK";
const STRICT_MODE = "STRICT_MODE";

const dataInicial = {
  tasks: [],
  task: [],
  strictMode: false,
  strickTask: 0
};

export default function userReducer(state = dataInicial, action) {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case TASK_INFO:
      return { ...state, task: [action.payload] };
    case EDIT_TASK:
      const editTask = state.tasks.filter(item => item.id === action.payload.id)
      return { ...state, tasks: editTask}
    case DELETE_TASK:
      let newData = state.tasks.filter((data) => data.id !== action.payload);
      return { ...state, tasks: newData }

    case STRICT_MODE:
      return { ...state.strictMode, strickTask: action.payload, strictMode: true}

    default: {
      return state;
    }
  }
}

export const addTaskAction = (data, id) => async (dispatch) => {
  try {
    const json = JSON.stringify(data);
    const tasks = await axios.post(
      `http://localhost:3001/api/create/task/${id}`,
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
      type: ADD_TASK,
      payload: tasks.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editTaskAction = (data, id) => async (dispatch) => {
  try {
    const json = JSON.stringify(data);
    const url = await axios.put(
      `http://localhost:3001/api/update/task/${id}`,
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
      type: EDIT_TASK,
      payload: url.data,
    });
    // hacer un put {axios.put} en la URL y guardar la respuesta en el payload, copiarse de la funcion de arriba por las dudas
  } catch (error) {
    console.log(error);
  }
};

export const getTaskAction = (data) => async (dispatch) => {
  dispatch({
    type: TASK_INFO,
    payload: data,
  });
};

export const deleteTaskAction = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/api/delete/task/${id}`);
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
}

export const strictAction = (data) => (dispatch) => {

  dispatch({
    type: STRICT_MODE,
    payload: data
  })
}