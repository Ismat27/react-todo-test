import TodoForm from "../components/TodoForm";
import { useTodoProvider, TodoProps } from "../store/AppStore";

const AddTask = () => {
  const { addTask } = useTodoProvider();

  const addNewTask = (newTask: TodoProps) => {
    addTask(newTask);
  };
  return (
    <>
      <TodoForm
        initialFormValues={{ title: "", description: "", id: "" }}
        formTitle="Add New Task"
        formSubmit={addNewTask}
        successMsg="Task added successfully"
        clearField
      />
    </>
  );
};

export default AddTask;
