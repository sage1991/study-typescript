import React, { useRef } from "react";
import "./NewTodo.css";

type NewTodoProps = {
  onAddTodo:(text:string) => void;
}

const NewTodo: React.FC<NewTodoProps> = props => {

  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (e:React.FormEvent) => {
    e.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.onAddTodo(enteredText);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo Text</label>
        <input id="todo-text" type="text" ref={textInputRef} />
      </div>
      <button type="submit">add todo</button>
    </form>
  );
};
export default NewTodo;
