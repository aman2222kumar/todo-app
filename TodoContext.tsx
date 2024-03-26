import React, { createContext, useContext, useReducer } from "react";
import { ReactNode } from "react";
// Define todo item interface
interface TodoItem {
  id: number;
  text: string;
}

// Define action types
// Define action types
type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "EDIT_TODO"; payload: { id: number; text: string } };

// Define context type
interface TodoContextType {
  todos: TodoItem[];
  dispatch: React.Dispatch<TodoAction>;
}

// Create initial state
const initialState: TodoItem[] = [];

// Create context
const TodoContext = createContext<TodoContextType>({
  todos: initialState,
  dispatch: () => {},
});

// Define reducer function
const todoReducer = (state: TodoItem[], action: TodoAction): TodoItem[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), text: action.payload }];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    default:
      return state;
  }
};
// Define TodoProvider component
export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Define custom hook for using todo context
export const useTodoContext = () => useContext(TodoContext);
