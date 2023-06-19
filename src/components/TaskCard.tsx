import { TodoProps, useTodoProvider } from "../store/AppStore";
import { useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

type TaskCardPropsType = {
  item: TodoProps;
  popModal: (taskId: string) => void;
};

const TaskCard = ({ item, popModal }: TaskCardPropsType) => {
  const navigate = useNavigate();
  const { toggleCompletion } = useTodoProvider();
  return (
    <article className="task" key={item.id}>
      <div className="task-header">
        <input
          checked={item.isCompleted}
          type="checkbox"
          onChange={() => toggleCompletion(item.id as string)}
        />
        <h3 className="task-title">{item.title}</h3>
      </div>
      <p className="task-description">{item.description}</p>
      <div>
        <div className="icons">
          <span className="btn" onClick={() => navigate(`/${item.id}/update`)}>
            <AiFillEdit color={"#73de3a"} size={20} />
          </span>
          <span onClick={() => popModal(item.id!)} className="btn">
            <AiFillDelete color={"#eb4034"} size={20} />
          </span>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
