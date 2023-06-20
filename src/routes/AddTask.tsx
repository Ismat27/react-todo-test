import TodoForm from "../components/TodoForm";
import { useTodoProvider, TodoProps } from "../store/AppStore";
import { motion } from "framer-motion";

const AddTask = () => {
  const { addTask } = useTodoProvider();

  const addNewTask = (newTask: TodoProps) => {
    addTask(newTask);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TodoForm
        initialFormValues={{ title: "", description: "", id: "" }}
        formTitle="Add New Task"
        formSubmit={addNewTask}
        successMsg="Task added successfully"
        clearField
      />
    </motion.div>
  );
};

export default AddTask;
