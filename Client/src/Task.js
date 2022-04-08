import { useState } from 'react';

const Task = ({ removeTask, editTask, id, todo }) => {

  const [editable, setEditable] = useState(false);
  const [newTaskName, setNewTaskName] = useState(todo)

  const handleSubmit = e => {
    e.preventDefault();
    editTask(id, newTaskName);
    setNewTaskName('');
    setEditable(false);
  }

  if(editable === false){
    return (
      <li key={id} className="task">{todo}
        <button className="btn" onClick={() => setEditable(true)}>Edit</button>
        <button className="btn btn--red" onClick={() => removeTask(id)}>Remove</button>
      </li>
    )
  } else {
    return (
      <form id="edit-task-form" onSubmit={handleSubmit}>
        <input className="text-input" autoComplete="off" type="text" id="task-edit" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} />
        <button className="btn" type="submit">Confirm</button>
      </form>
    )
  }

}

export default Task;