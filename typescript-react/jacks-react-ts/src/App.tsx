import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import {
  // useTodos,
  // useAddTodos,
  // useRemoveTodos,
  // TodosProvider,
  useTodosManager,
} from "./useTodos";
import { Provider, useSelector, useDispatch } from "react-redux";
import store, { selectTodos, addTodo, removeTodo } from "./store";
import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
);

const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> & { title?: string } = ({ title, children, style, ...rest }) => (
  <button
    {...rest}
    style={{ backgroundColor: "red", color: "white", fontSize: "xx-large" }}
  >
    {title ?? children}
  </button>
);

function UL<T>({
  items,
  render,
  itemClick,
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  items: T[];
  render: (item: T) => ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => itemClick(item)}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

const initialTodos = [{ id: 0, text: "hey there useContext", done: false }];

function App() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  // const { todos, addTodo, removeTodo } = useTodosManager(initialTodos);
  // const todos = useTodos();
  // const addTodo = useAddTodos();
  // const removeTodo = useRemoveTodos();

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch(addTodo(newTodoRef.current!.value));
      newTodoRef.current.value = "";
    }
  }, [dispatch]);

  return (
    <div>
      <Heading title="Introduction" />

      <Box>Hello there</Box>

      <Heading title="Todos" />
      <UL
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(todo) => (
          <>
            {todo.text}
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </button>
          </>
        )}
      />
      <div>
        <input type="text" ref={newTodoRef} />
        <Button onClick={onAddTodo}>ADD Todo</Button>
      </div>
    </div>
  );
}

const JustShowTodos = () => {
  const todos = useSelector(selectTodos);
  // const todos = useTodos();
  // const { todos } = useTodosManager(initialTodos);

  return (
    <UL
      items={todos}
      itemClick={() => {}}
      render={(todo) => <>{todo.text}</>}
    />
  );
};

const AppWrapper = () => (
  <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
    <Provider store={store}>
      <App />
      <JustShowTodos />
    </Provider>
  </div>
);

export default AppWrapper;
