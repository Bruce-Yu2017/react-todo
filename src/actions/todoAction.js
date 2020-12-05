import {
  ADD_TODO,
  TOGGLE_COMPLETED,
  DELETE_TODO,
  UPDATE_TODO,
  FILTER_TODOS,
  SORT_TODOS,
} from "../constants/todoConstants";

export const markAsCompleted = (id, isCompleted) => {
  return {
    type: TOGGLE_COMPLETED,
    payload: { id, isCompleted },
  };
};

export const filterTodos = (filteredTodos) => {
  return {
    type: FILTER_TODOS,
    payload: filteredTodos,
  };
};

export const updateTodo = (id, updatedName, isEditing) => {
  return {
    type: UPDATE_TODO,
    payload: { id, updatedName, isEditing },
  };
};

export const addTodo = (name) => {
  return {
    type: ADD_TODO,
    payload: { name },
  };
};

export const sortTodo = (todos) => {
  return {
    type: SORT_TODOS,
    payload: { todos },
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: { id },
  };
};
