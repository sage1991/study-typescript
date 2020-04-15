import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";

type Todo = {
  id: string;
  text: string;
};

const App: React.FC = () => {
  const [todoListState, setTodoListState] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    if (!text) {
      return;
    }
    setTodoListState((prevTodoList) => [
      ...prevTodoList,
      { id: Date.now().toString(), text: text },
    ]);
  };

  const todoDeleteHandler = (id: string) => {
    setTodoListState((prevTodoList) => {
      return prevTodoList.filter((todo) => todo.id !== id);
    });
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todoListState} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;
