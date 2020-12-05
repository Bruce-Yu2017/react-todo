import "./App.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Todos from "./components/Todos/Todos";
import TodoNav from "./components/Navbar/TodoNav";
import Toolbar from "./components/Toolbar/Toolbar";

function App() {
  return (
    <div className="App">
      <TodoNav />
      <Container className="mt-5">
        <Toolbar />
        <Todos />
      </Container>
    </div>
  );
}

export default App;
