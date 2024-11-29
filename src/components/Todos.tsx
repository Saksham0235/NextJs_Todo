"use client";

import { useTodos } from "@/store/todos";
import { useSearchParams } from "next/navigation";
import React from "react";


const Todos = () => {
  const { todos, handleDelete, toggleComplete } = useTodos();
  const searchParams=  useSearchParams();
  const todosFilter=searchParams.get('todos')
  let filterTodos=todos
  if(todosFilter==='active')
  {
   filterTodos = todos.filter((todo) => !todo.completed);
  }
  if(todosFilter==='completed')
  {
    filterTodos = todos.filter((todo) => todo.completed);
  }
  
  return (
    <ul>
      {filterTodos.map((ele) => {
        return (
          <li key={ele.id}>
            <input
              type="checkbox"
              name=""
              id={`todo-${ele.id}`}
              checked={ele.completed}
              onChange={() => toggleComplete(ele.id)}
            />
            <label htmlFor={`todo-${ele.id}`}>{ele.task}</label>
            {ele.completed && (
              <button className="del_btn" type="button" onClick={() => handleDelete(ele.id)}>
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Todos;
