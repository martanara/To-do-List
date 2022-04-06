import io from 'socket.io-client';
import shortid from 'shortid';
import { useState, useEffect } from 'react';

const  App = () => {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const socket = io('http://localhost:8000/');

  useEffect(() => {
    socket.on('updateTasks', (tasksFromServer) => setTasks(tasksFromServer))
    console.log('received!')
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
          tasks.map(task => (
            <li key={task.id} className="task">{task.todo}
              <button className="btn btn--red" onClick={() => removeTask(task.id)}>Remove</button>
            </li>
          ))
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
