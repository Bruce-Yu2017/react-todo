import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../actions/todoAction";

const UpdateForm = ({ todo }) => {
  const [isShow, setFormShow] = useState(false);
  const dispatch = useDispatch();

  const [updatedName, setUpdateName] = useState(todo.name);
  const showForm = (e) => {
    e.stopPropagation();
    if (!todo.finished) {
      setFormShow(true);
      setTimeout(() => {
        const input = document.getElementById(todo.id);
        input.focus();
        dispatch(updateTodo(todo.id, todo.name, true));
      });
    }
  };
  const onChange = (e) => {
    setUpdateName(e.target.value);
  };

  const submit = (e) => {
    if (updatedName.length > 0) {
      dispatch(updateTodo(todo.id, updatedName, false));
    }
    setFormShow(false);
  };
  return (
    <>
      {!isShow && <span onClick={(e) => showForm(e)}>{todo.name}</span>}
      {isShow && (
        <span>
          <Form inline className="ml-auto" onSubmit={(e) => submit(e)}>
            <Form.Control
              type="text"
              placeholder="Update Name"
              size="sm"
              id={todo.id}
              className="mr-sm-2 shadow-none"
              value={updatedName}
              onChange={(e) => onChange(e)}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onBlur={(e) => {
                submit(e);
              }}
            />
          </Form>
        </span>
      )}
    </>
  );
};

export default UpdateForm;
