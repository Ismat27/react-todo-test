import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Nav from "./components/Nav";
import TodoList from "./routes/TodoList";
import AddTask from "./routes/AddTask";
import EditTask from "./routes/EditTask";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/:taskId/update" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
