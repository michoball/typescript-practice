import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { createGlobalState } from "react-use";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}
// type ActionType =
//   | { type: "ADD"; text: string }
//   | { type: "REMOVE"; id: number };

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const useGlobaltodos = createGlobalState<Todo[]>([]);

export const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

export function useTodosManager(initalTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, setTodos] = useGlobaltodos();

  useEffect(() => {
    setTodos(initalTodos);
  }, [initalTodos, setTodos]);

  const addTodo = useCallback(
    (text: string) => {
      setTodos([
        ...todos,
        {
          id: todos.length,
          text: text,
          done: false,
        },
      ]);
    },
    [todos, setTodos]
  );

  const removeTodo = useCallback(
    (removeId: number) => {
      setTodos(todos.filter(({ id }) => id !== removeId));
    },
    [todos, setTodos]
  );

  return { todos, addTodo, removeTodo };
}

export const TodosProvider: FC<{
  initialTodos: Todo[];
  children: ReactNode;
}> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = (): Todo[] => {
  const { todos } = useContext(TodoContext);
  return todos;
};
export const useAddTodos = (): UseTodosManagerResult["addTodo"] => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};
export const useRemoveTodos = (): UseTodosManagerResult["removeTodo"] => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};
