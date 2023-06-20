import { Route, Routes, useLocation } from "react-router-dom";
import TodoList from "./TodoList";
import AddTask from "./AddTask";
import EditTask from "./EditTask";

const AllRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<TodoList />} />
      <Route path="/add-task" element={<AddTask />} />
      <Route path="/:taskId/update" element={<EditTask />} />
    </Routes>
  );
};

export default AllRoutes;
