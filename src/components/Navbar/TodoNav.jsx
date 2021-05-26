import React, { useState } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Container,
  Dropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { filterTodos } from "../../actions/todoAction";
import { changeLanguage } from "../../actions/languageAction";
import { IoLanguage } from "react-icons/io5";
const TodoNav = () => {
  const { todos, language } = useSelector((state) => state);
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
        return null;
      });
      dispatch(filterTodos(temp));
    } else {
      temp.map((todo) => {
        const name = todo.name.toLowerCase();
        todo.filtered = !name.includes(text);
        return null;
      });
      dispatch(filterTodos(temp));
    }
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>TODO</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {todos.length > 0 && (
              <Form inline className="ml-auto">
                <Dropdown className="mr-2">
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    size="sm"
                    variant="light"
                  >
                    <IoLanguage /> {language.language}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(changeLanguage("english"));
                      }}
                    >
                      English
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(changeLanguage("simplifiedChinese"));
                      }}
                    >
                      简体中文
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(changeLanguage("spanish"));
                      }}
                    >
                      Español
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <FormControl
                  type="text"
                  placeholder={language.searchByName}
                  className="mr-sm-2"
                  value={search}
                  onChange={(e) => onChange(e)}
                />
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TodoNav;
