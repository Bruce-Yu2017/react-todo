import React, { useState } from "react";
import { Form, DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, sortTodo } from "../../actions/todoAction";

const Toolbar = () => {
  const { todos, language } = useSelector((state) => state);
  const [sortType, setSortType] = useState("featured");
  const [todoName, setTodoName] = useState("");
  const dispatch = useDispatch();

  const createTodo = (e) => {
    e.preventDefault();
    if (todoName.length > 0) {
      dispatch(addTodo(todoName));
      setTodoName("");
    }
  };

  const sortBy = (type) => {
    setSortType(type);
    const state = JSON.parse(localStorage.getItem("todosInStorage"));
    const { todos } = state;
    if (type === "featured") {
      dispatch(sortTodo(todos));
    }
    if (type.includes("date")) {
      todos.sort((a, b) => {
        const sortType =
          type === "dateOldToNew"
            ? a.createdAt - b.createdAt
            : b.createdAt - a.createdAt;
        return sortType;
      });
      dispatch(sortTodo(todos));
    }
    if (type === "status") {
      todos.sort((a, b) => {
        if (a.finished < b.finished) {
          return -1;
        }
        if (a.finished > b.finished) {
          return 1;
        }
        return 0;
      });
      dispatch(sortTodo(todos));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2">
        <Form
          inline
          size="sm"
          onSubmit={(e) => {
            createTodo(e);
          }}
        >
          <Form.Control
            type="text"
            placeholder={language.addToDo}
            size="sm"
            className="mr-sm-2 shadow-none"
            value={todoName}
            onChange={(e) => {
              setTodoName(e.target.value);
            }}
            onBlur={(e) => {
              createTodo(e);
            }}
          />
        </Form>
        {todos.length > 0 && (
          <DropdownButton
            title={`${language.sortBy}: ${language[sortType]}`}
            size="sm"
            variant="secondary"
          >
            <Dropdown.Item
              onClick={() => {
                sortBy("featured");
              }}
            >
              {language.featured}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortBy("dateNewToOld");
              }}
            >
              {language.dateNewToOld}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortBy("dateOldToNew");
              }}
            >
              {language.dateOldToNew}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortBy("status");
              }}
            >
              {language.status}
            </Dropdown.Item>
          </DropdownButton>
        )}
      </div>
    </>
  );
};

export default Toolbar;
