import AddTodo from '@/components/AddTodo'
import Todos from '@/components/Todos'
import Navbar from '@/components/Navbar'
import {  RiTodoLine } from "react-icons/ri";
import "./globals.css"
import { RiArrowDownCircleFill } from "react-icons/ri";



export default function Home() {
  return (
   <main>
    <h2><RiTodoLine className='icon'/>TODO<RiTodoLine className='icon'/></h2>
    <Navbar/>
    <AddTodo/>
    <Todos/>
   </main>
  )
}
