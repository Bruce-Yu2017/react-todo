import { createStore, combineReducers } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { todosReducer } from "./reducers/todosReducer";

const reducers = combineReducers({
  todos: todosReducer,
});

const initObj = {
  todos: [
    {
      id: Math.floor(Math.random() * 100000),
      name: "Study new things",
      createdAt: 1606934271000,
      finished: false,
      filtered: false,
      isEditing: false,
    },
    {
      id: Math.floor(Math.random() * 100000),
      name: "Cleaning bed room",
      createdAt: 1601746671000,
      finished: true,
      filtered: false,
      isEditing: false,
      finishedAt: 1601846671000,
    },
    {
      id: Math.floor(Math.random() * 100000),
      name: "Go to Costco",
      createdAt: 1604428671000,
      finished: false,
      filtered: false,
      isEditing: false,
    },
  ],
};

const getInitState = () => {
  const objInStorage = localStorage.getItem("todosInStorage");
  if (!objInStorage) {
    localStorage.setItem("todosInStorage", JSON.stringify(initObj));
    return initObj;
  }
  const state = JSON.parse(localStorage.getItem("todosInStorage"));
  const { todos } = state;
  for (let i = 0; i < todos.length; i++) {
    todos[i].filtered = false;
  }
  return state;
};

export const store = createStore(
  reducers,
  getInitState(),
  composeWithDevTools()
);
