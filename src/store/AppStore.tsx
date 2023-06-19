import React, { useState, useContext } from "react";

export type TodoProps = {
  title: string;
  description: string;
  isCompleted?: boolean;
  id?: string;
};

export type TodoContextPropsType = {
  allTasks: TodoProps[];
  addTask: (newTask: TodoProps) => void;
  editTask: (updatedTask: TodoProps) => void;
  toggleCompletion: (taskId: string) => void;
  removeTask: (taskId: string) => void;
};

const storedTasks: TodoProps[] = JSON.parse(
  localStorage.getItem("todos") || "[]"
);

export const TodoContext = React.createContext<TodoContextPropsType | null>(
  null
);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [allTasks, setAllTasks] = useState<TodoProps[]>(storedTasks);

  const saveTasks = (tasks: TodoProps[]) => {
    localStorage.setItem("todos", JSON.stringify(tasks));
    setAllTasks(tasks);
  };

  const addTask = (newTask: TodoProps) => {
    const tasks = [newTask, ...allTasks];
    saveTasks(tasks);
  };

  const editTask = (updatedTask: TodoProps) => {
    const tasks = allTasks.map((task) => {
      if (updatedTask.id === task.id) {
        return updatedTask;
      }
      return task;
    });
    saveTasks(tasks);
  };

  const toggleCompletion = (taskId: string) => {
    const tasks = allTasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    saveTasks(tasks);
  };

  const removeTask = (taskId: string) => {
    const tasks = allTasks.filter((task) => task.id !== taskId);
    saveTasks(tasks);
  };

  return (
    <TodoContext.Provider
      value={{ allTasks, addTask, editTask, toggleCompletion, removeTask }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoProvider = () => {
  return useContext(TodoContext) as TodoContextPropsType;
};

export default TodoProvider;
