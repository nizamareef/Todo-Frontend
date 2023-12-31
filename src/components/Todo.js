import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
export const Todo = ({task,fetchTodos, handleDeleteTodo, editTodo, toggleComplete}) => {
  const [isChecked, setChecked] = useState(task.completed);
 const handleCheckBox=async(id)=>{
  setChecked(!isChecked)
  const response=await axios.put(`https://todo-v5st.onrender.com/api/edit?id=${id}`,{task:task.task,completed:isChecked})
  fetchTodos()
 }
 
  return (
    <div className="Todo">
        <p className={`${task.completed ? 'completed' : ""}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>
        <div>
        <input className='check ' checked={task.completed === 1 || task.completed === true } type='checkbox' onChange={(e)=>handleCheckBox(task.id,e)} />
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteTodo(task.id)} />
        </div>
    </div>
  )
}  