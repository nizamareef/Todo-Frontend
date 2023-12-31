import React, {useState} from 'react'
import axios from 'axios'

export const EditTodoForm = ({task,fetchTodos}) => {
    const [value, setValue] = useState(task.task);
    const handleEditTask = async(id,e) => {
      e.preventDefault();
      
      try {
         const newTodo= await axios.put(`https://todo-v5st.onrender.com/api/edit?id=${id}`,{task:value,completed: task.completed})
         fetchTodos()
        } catch (error) {
        }
      
  }

  return (
    <form onSubmit={(e)=>handleEditTask(task.id,e)} className="TodoForm">
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Update task' />
    <button type="submit" className='todo-btn'>Add Task</button>
  </form>
  )
}
