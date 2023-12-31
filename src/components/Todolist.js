import React, {useState, useEffect} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
uuidv4();

export const Todolist = () => {
    const [todos, setTodos] = useState([])
    const [task, setTask] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        
        fetchTodos()
    }, []);

    const fetchTodos=async()=>{
        try{
            const response=await axios.get('https://todo-v5st.onrender.com/api/tasks')
            setTodos(response.data)
        }
        catch(err){
            console.error(err.message)
        }
    }
    
    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const handleDeleteTodo = async(id)=> {
        try {
            await axios.delete(`https://todo-v5st.onrender.com/api/delete?id=${id}`)
            setTodos(todos.filter((todo) => todo.id !== id))
        } catch (error) {
            console.error(error.message)
        }    
    }

    const editTodo = async(id) => {
        setTodos(
            todos.map((todo) =>
              todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
          );
    }

   
  return (
    <div className='TodoWrapper'>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><h1>Get Things Done!</h1>  <h5 style={{color:'white',cursor: 'pointer'}} > <FontAwesomeIcon icon={faSearch}/></h5></div>
    
     <TodoForm fetchTodos={fetchTodos}/>
        {todos.map((todo, index) => (
            todo.isEditing ? (
                <EditTodoForm fetchTodos={fetchTodos}  task={todo} />
            ) : (
                <Todo task={todo} key={index} fetchTodos={fetchTodos} toggleComplete={toggleComplete} handleDeleteTodo={handleDeleteTodo} editTodo={editTodo} />
            )
            
        ))}
      
         
    </div>
  )
}
