import {
  ADD_TODO,
  TOGGLE_COMPLETED,
  DELETE_TODO,
  UPDATE_TODO,
  FILTER_TODOS,
  SORT_TODOS,
} from "../constants/todoConstants";

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodo = {
        id: Math.floor(Math.random() * 100000),
        name: action.payload.name,
        createdAt: new Date().getTime(),
        finished: false,
        filtered: false,
        isEditing: false,
      };
      const newArr = [...state, newTodo];
      localStorage.setItem(
        "todosInStorage",
        JSON.stringify({
          todos: newArr,
        })
      );
      return newArr;
    case TOGGLE_COMPLETED:
      const newState = state.map((item) => {
        const { id, isCompleted } = action.payload;
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          id,
          finished: isCompleted,
          finishedAt: isCompleted ? new Date().getTime() : null,
        };
      });
      localStorage.setItem(
        "todosInStorage",
        JSON.stringify({
          todos: newState,
        })
      );
      return newState;
    case FILTER_TODOS:
      return action.payload;
    case UPDATE_TODO:
      const updated = state.map((item) => {
        const { id, updatedName, isEditing } = action.payload;
        if (item.id !== id) {
          return item;
        }
        const currentTodo = { ...item, isEditing };
        if (!isEditing && currentTodo.name !== updatedName) {
          const { editHistory } = currentTodo;
          if (!editHistory) {
            currentTodo["editHistory"] = [new Date().getTime()];
          } else {
            currentTodo["editHistory"].unshift(new Date().getTime());
          }
          currentTodo.name = updatedName;
        }

        return currentTodo;
      });
      localStorage.setItem(
        "todosInStorage",
        JSON.stringify({
          todos: updated,
        })
      );
      return updated;
    case SORT_TODOS:
      return action.payload.todos;
    case DELETE_TODO:
      const addedState = state.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem(
        "todosInStorage",
        JSON.stringify({
          todos: addedState,
        })
      );
      return addedState;
    default:
      return state;
  }
};
