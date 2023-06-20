import { useParams, Link } from "react-router-dom";
import { useTodoProvider } from "../store/AppStore";
import TodoForm from "../components/TodoForm";
import styled from "styled-components";
import { motion } from "framer-motion";

const EditTask = () => {
  const { allTasks, editTask } = useTodoProvider();
  const { taskId } = useParams();
  const task = allTasks.find((item) => item.id === taskId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        {!task ? (
          <div className="content not-found">
            <p>Task not found</p>
            <Link className="button" to={"/"}>
              View Tasks
            </Link>
          </div>
        ) : (
          <TodoForm
            initialFormValues={task}
            formTitle="Edit task"
            formSubmit={editTask}
            successMsg="Task updated successfully"
            btnText="Update task"
          />
        )}
      </Wrapper>
    </motion.div>
  );
};

const Wrapper = styled.main`
  .not-found {
    text-align: center;
    height: 100vh;
  }
  a {
    background-color: #73de3a;
    display: inline-block;
    color: white;
    margin-top: 1rem;
  }
`;

export default EditTask;
