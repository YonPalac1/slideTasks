import axios from "axios";

const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const EDIT = "EDIT";
const SESION = "SESION";
const LOGOUT = "LOGOUT";

const dataInicial = {
  user: [],
  ok: false,
};

export default function userReducer(state = dataInicial, action) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        user: action.payload.data,
        ok: action.payload.meta.ok,
      };
    case LOGIN:
      return { ...state, user: action.payload.data, ok: action.payload.meta.ok }

    case EDIT:
      return { ...state, user: action.payload.data, ok: action.payload.meta.ok }
      
    case SESION:
      return { ...state, user: action.payload, ok: true };
    case LOGOUT:
      return { ...state, user: null, ok: false };

    default: {
      return state;
    }
  }
}

export const registerAction = (data) => async (dispatch) => {
  try {
    const json = JSON.stringify(data);
    const res = await axios.post("http://localhost:3001/user/register", json, {
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    localStorage.setItem("user", JSON.stringify(res.data.data));
    dispatch({
      type: REGISTER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const loginAction = (loginData, check) => async (dispatch) => {
  try {
    const json = JSON.stringify(loginData);
    const res = await axios.post("http://localhost:3001/user/login", json, {
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (check) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
    }
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const editAction = (data) => async (dispatch) => {
  localStorage.setItem("user", JSON.stringify(data))
}

export const sesionAction = (data) => (dispatch) => {
  const user = JSON.parse(data);
  dispatch({
    type: SESION,
    payload: user,
  });
};


export const logoutAction = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: LOGOUT,
    payload: false,
  });
}
