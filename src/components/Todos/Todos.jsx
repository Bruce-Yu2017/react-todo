import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, OverlayTrigger, Tooltip, ListGroup } from "react-bootstrap";
import { markAsCompleted, deleteTodo } from "../../actions/todoAction";
import "./Todos.scss";
import UpdateForm from "../UpdateForm/UpdateForm";

const Todos = () => {
  const { todos, language } = useSelector((state) => state);
  const dispatch = useDispatch();

  const toggleComplete = (e, todo) => {
    const checked = todo.finished;
    if (!todo.isEditing) {
      dispatch(markAsCompleted(todo.id, !checked));
    }
  };

  const removeTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const renderTodo = () => {
    const filtered = todos.filter((todo) => !todo.filtered);
    return filtered.map((todo, index) => {
      return (
        <tr
          key={todo.id}
          onClick={(e) => toggleComplete(e, todo)}
          className={`todo-row ${todo.finished ? "strikeout" : ""}`}
        >
          <td>{index + 1}</td>
          <td>
            <UpdateForm todo={todo} />
          </td>
          <td>{new Date(todo.createdAt).toLocaleString()}</td>
          <td>
            {todo.finished ? (
              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip>
                    {language.finishedAt}{" "}
                    {new Date(todo.finishedAt).toLocaleString()}
                  </Tooltip>
                }
              >
                <i
                  className="far fa-check-circle"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                ></i>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement={"bottom"}
                overlay={
                  <Tooltip>
                    <div className="d-flex flex-column justify-content-center">
                      {language.editHistory}:
                      {todo.editHistory && todo.editHistory.length > 0
                        ? todo.editHistory.map((his) => {
                            return (
                              <span key={his}>
                                {new Date(his).toLocaleString()}
                              </span>
                            );
                          })
                        : "None"}
                    </div>
                  </Tooltip>
                }
              >
                <i
                  className="far fa-times-circle"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                ></i>
              </OverlayTrigger>
            )}
          </td>
          <td>
            <i
              className="fas fa-trash"
              onClick={(e) => {
                e.stopPropagation();
                removeTodo(todo.id);
              }}
            ></i>
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      {todos.length > 0 && (
        <Table bordered size="md">
          <thead>
            <tr>
              <th className="status-col">#</th>
              <th className="name-col">{language.content}</th>
              <th>{language.createdDate}</th>
              <th className="status-col">{language.status}</th>
              <th>{language.action}</th>
            </tr>
          </thead>
          <tbody>{renderTodo()}</tbody>
        </Table>
      )}
    </div>
  );
};

export default Todos;
