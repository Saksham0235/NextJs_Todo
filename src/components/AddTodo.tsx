"use client";
import { useTodos } from "@/store/todos";
import React, { FormEvent, useState } from "react";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const {handleAddTodo}=useTodos()
  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    handleAddTodo(todo);
    setTodo("")
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Your Todo"
        name=""
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button  type="submit">ADD</button>
    </form>
  );
}; 

export default AddTodo;
