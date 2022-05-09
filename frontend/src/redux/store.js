import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducer from "./userReducer.js";
import projectsReducer from "./projectsReducer.js";
import tasksReducer from "./tasksReducer.js";

const rootReducer = combineReducers({
  user: userReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
