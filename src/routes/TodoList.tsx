import styled from "styled-components";
import { useTodoProvider } from "../store/AppStore";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import TaskCard from "../components/TaskCard";
Modal.setAppElement("#root");
import { motion } from "framer-motion";

const moduleStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    padding: "0",
  },
  overlay: {
    backgroundColor: "rgba(25, 25, 25, 0.5)",
  },
};

type statusType = "all" | "completed" | "not-completed";

const TodoList = () => {
  const { allTasks, removeTask } = useTodoProvider();
  const [displayedTasks, setDisplayedTasks] = useState([...allTasks]);
  const [status, setStatus] = useState<statusType>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [taskId, setTaskId] = useState<string>("");

  const popModal = (task_id: string) => {
    setTaskId(task_id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    switch (status) {
      case "all":
        setDisplayedTasks(allTasks);
        break;
      case "completed":
        setDisplayedTasks(allTasks.filter((item) => item.isCompleted));
        break;
      case "not-completed":
        setDisplayedTasks(allTasks.filter((item) => !item.isCompleted));
        break;
      default:
        setDisplayedTasks(allTasks);
        break;
    }
  }, [allTasks, status]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper className="content">
        <div className="tab-controls">
          <p
            onClick={() => setStatus("all")}
            className={`${
              status === "all" ? "tab-toggle active" : "tab-toggle"
            }`}
          >
            All tasks
          </p>
          <p
            onClick={() => setStatus("completed")}
            className={`${
              status === "completed" ? "tab-toggle active" : "tab-toggle"
            }`}
          >
            Completed tasks
          </p>
          <p
            onClick={() => setStatus("not-completed")}
            className={`${
              status === "not-completed" ? "tab-toggle active" : "tab-toggle"
            }`}
          >
            Uncompleted tasks
          </p>
        </div>
        <div className="tasks">
          {displayedTasks.map((item) => {
            return <TaskCard key={item.id} item={item} popModal={popModal} />;
          })}
        </div>
        <Modal isOpen={isModalOpen} style={moduleStyles} closeTimeoutMS={400}>
          <div className="delete-modal">
            <h4>Remove task from list?</h4>
            <div className="cta-btns flex">
              <button className="" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button
                className="danger-btn"
                onClick={() => {
                  removeTask(taskId);
                  setIsModalOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </Wrapper>
    </motion.div>
  );
};

const Wrapper = styled.main`
  min-height: 100vh;
  background-color: white;
  .tab-controls {
    display: flex;
    gap: 1rem;
    cursor: pointer;
    margin-bottom: 1rem;
  }
  .tab-toggle {
    font-size: 14px;
    font-weight: 700;
  }
  .tab-toggle.active {
    color: #73de3a;
  }
  button {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
  .task {
    background-color: #f3f3f4;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  .task-header {
    display: flex;
    gap: 0.5rem;
  }
  .task-title {
    font-size: 1rem;
  }
  .task-description {
    margin-block: 0.5rem;
  }
  .task + .task {
    margin-top: 1rem;
  }
  .icons {
    display: flex;
    justify-content: end;
    gap: 0.5rem;
  }
  h4 {
    margin-bottom: 1rem;
  }
  .cta-btns {
    margin-block: 1rem;
  }
`;

export default TodoList;
