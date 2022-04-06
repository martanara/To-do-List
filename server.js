const express = require('express');
const cors = require('cors')
const path = require('path');
const app = express();

app.use(cors())

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...')
})

const socket = require('socket.io');
const io = socket(server);

let tasks = [{id: 1, todo: 'Shopping'}, {id: 2, todo: 'Go out with a dog'}];

io.on('connection', (socket) => {
  //console.log('New client is connected. No' + socket.id);
  socket.emit('updateTasks', tasks);
  socket.on('removeTask', taskId => {
    tasks = tasks.filter(task => task.id !== taskId)
    socket.broadcast.emit('updateTasks', tasks)
  });
  socket.on('addTask', task => {
    tasks.push(task)
    socket.broadcast.emit('updateTasks', tasks)
  });
})

app.use(express.static(path.join(__dirname, '/Client/build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/Client/build/index.html'));
});


app.use((req,res) => {
  res.status(404).send({ message: 'Not found...' });
})