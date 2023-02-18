import React from "react";
import "./TodoList.css";
interface TodoListProps {
  items: { id: string; text: string }[];
  onTodoDelete: (todoId: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={props.onTodoDelete.bind(null, todo.id)}>
            CLAER
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
