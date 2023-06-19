import { useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import { toast } from "react-toastify";

import { TodoProps } from "../store/AppStore";

type FormPropsType = {
  initialFormValues: TodoProps;
  clearField?: boolean;
  formTitle: string;
  formSubmit: (task: TodoProps) => void;
  successMsg?: string;
  btnText?: string;
};

const TodoForm = ({
  initialFormValues,
  formTitle,
  formSubmit,
  successMsg,
  clearField = false,
  btnText = "Add task",
}: FormPropsType) => {
  const [title, setTitle] = useState(initialFormValues.title);
  const [description, setDescription] = useState(initialFormValues.description);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim().length < 3 || description.trim().length < 3) {
      return toast.error("Minimun Length of task title and description is 3");
    }
    formSubmit({
      title: title,
      description: description,
      id: initialFormValues.id || v4(),
      isCompleted: initialFormValues.isCompleted || false,
    });
    if (clearField) {
      setDescription("");
      setTitle("");
    }
    return toast.success(successMsg || "Success");
  };

  return (
    <Wrapper>
      <div className="content">
        <h1>{formTitle}</h1>
        <form onSubmit={onFormSubmit}>
          <div className="form-fields">
            <div>
              <label htmlFor="title">Title</label>
              <input
                name="title"
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Task Description</label>
              <textarea
                rows={10}
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <button>{btnText}</button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-fields > div {
    margin-bottom: 1rem;
  }
  label {
    font-weight: 700;
  }
  input[type="text"],
  textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid #e4e7ed;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
  }
  input:focus,
  textarea:focus {
    outline: none;
  }
`;

export default TodoForm;
