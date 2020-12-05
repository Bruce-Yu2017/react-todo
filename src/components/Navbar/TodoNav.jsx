import React, { useState } from "react";
import { Navbar, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { filterTodos } from "../../actions/todoAction";

const TodoNav = () => {
  const { todos } = useSelector((state) => state);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const onChange = (e) => {
    const text = e.target.value;
    const temp = [...todos];

    setSearch(text);
    const val = text.trim();
    if (val.length === 0) {
      temp.map((todo) => {
        todo.filtered = false;
      });
      dispatch(filterTodos(temp));
    } else {
      temp.map((todo) => {
        const name = todo.name.toLowerCase();
        todo.filtered = !name.includes(text);
      });
      dispatch(filterTodos(temp));
    }
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>TODO</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {todos.length > 0 && (
            <Form inline className="ml-auto">
              <FormControl
                type="text"
                placeholder="Search by name"
                className="mr-sm-2"
                value={search}
                onChange={(e) => onChange(e)}
              />
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default TodoNav;
