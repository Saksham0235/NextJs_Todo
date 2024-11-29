"use client";
import { createContext, ReactNode, useState, useContext,useEffect } from "react";

export type Todo = {
  id: number;
  task: string;
  completed: boolean;
  createdAt: Date;
};
export type TodosContext = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
  toggleComplete: (id: number) => void;
  handleDelete: (id: number) => void;
};

export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Only runs on the client
    const storedTodos = window.localStorage.getItem("todos") || "[]";
    setTodos(JSON.parse(storedTodos));
  }, []);
  const handleAddTodo = (task: string) => {
    setTodos((prev) => {
      const newTodo: Todo[] = [
        {
          id: Math.random(),
          task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    });
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) => {
      const newTodo = todos.map((ele) =>
        ele.id === id ? { ...ele, completed: !ele.completed } : ele
      );
      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    });
  };
  const handleDelete = (id: number) => {
    setTodos((prev) => {
      const newTodo = prev.filter((ele) => ele.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    });
  };

  return (
    <todosContext.Provider
      value={{ todos, handleAddTodo, toggleComplete, handleDelete }}
    >
      {children}
    </todosContext.Provider>
  );
};

//context api
export function useTodos() {
  const todosContextvalue = useContext(todosContext);

  if (!todosContextvalue) {
    throw new Error("useTodos must be used outside of TodosProvider");
  }
  return todosContextvalue;
}
