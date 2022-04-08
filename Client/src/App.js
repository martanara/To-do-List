import io from 'socket.io-client';
import shortid from 'shortid';
import { useState, useEffect } from 'react';
import Task from './Task';

const  App = () => {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const socket = io('http://localhost:8000/');

  useEffect(() => {
    socket.on('updateTasks', (tasksFromServer) => setTasks(tasksFromServer))
  }, []);

  const removeTask = taskId => {
    setTasks(tasks.filter(task => task.id !== taskId))
    socket.emit('removeTask', taskId)
  };

  const addTask = newTask => {
    const task = { id: shortid(), todo: newTask }
    setTasks([...tasks, task])
    socket.emit('addTask', task)
  };

  const editTask = (id, editedTodo) => {
    const editedTask = { id, todo: editedTodo}
    setTasks(tasks.map(task => task.id === editedTask.id ? {...task, ...editedTask} : task));
    socket.emit('editTask', editedTask)
  }

  const handleSubmit = e => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
  };

  return (
    <div className="App">
    <header>
      <h1>ToDoList.app</h1>
    </header>

    <section className="tasks-section" id="tasks-section">
      <h2>Tasks</h2>
      <ul className="tasks-section__list" id="tasks-list">
        { 
          tasks.map(task => <Task key={task.id} removeTask={removeTask}  editTask={editTask} id={task.id} todo={task.todo}/>)
        }
      </ul>
      <form id="add-task-form" onSubmit={handleSubmit}>
        <input className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button className="btn" type="submit">Add</button>
      </form>

    </section>
  </div>
  );
}

export default App;
