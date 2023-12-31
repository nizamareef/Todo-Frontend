import React, {useState} from 'react'
import axios from 'axios'


export const TodoForm = ({fetchTodos}) => {
    const [task, setTask] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleCreateTodo = async(e)=>{
      e.preventDefault();
      try {
        const newTodo = await axios.post('https://todo-v5st.onrender.com/api/addtodo',{task,completed})
        if(newTodo.status===200){
          setTask('')
          fetchTodos()
        }else{
          console.error("Error in adding a task")
        }
        
      } catch (error) {
        console.error(error.message)
      }
  }
  return (
    <form onSubmit={handleCreateTodo} className="TodoForm">
    <input type="text" value={task} onChange={(e) => setTask(e.target.value)} className="todo-input" placeholder='Enter todo ' />
    <button type="submit" className='todo-btn'>Add Task</button>
  </form>
  )
}
