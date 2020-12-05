import React, { useState } from "react";
import { Form, DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, sortTodo } from "../../actions/todoAction";

const Toolbar = () => {
  const { todos } = useSelector((state) => state);
  const [sortType, setSortType] = useState("Featured");
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
    if (type === "Featured") {
      dispatch(sortTodo(todos));
    }
    if (type.includes("Date")) {
      todos.sort((a, b) => {
        const sortType =
          type === "Date(Old To New)"
            ? a.createdAt - b.createdAt
            : b.createdAt - a.createdAt;
        return sortType;
      });
      dispatch(sortTodo(todos));
    }
    if (type === "Status") {
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
            placeholder="Add Todo"
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
            title={`Sort by: ${sortType}`}
            size="sm"
            variant="secondary"
          >
            <Dropdown.Item
              onClick={() => {
                sortBy("Featured");
              }}
            >
              Featured
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortBy("Date(New To Old)");
              }}
            >
              Date(New To Old)
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortBy("Date(Old To New)");
              }}
            >
              Date(Old To New)
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortBy("Status");
              }}
            >
              Status
            </Dropdown.Item>
          </DropdownButton>
        )}
      </div>
    </>
  );
};

export default Toolbar;
