const express = require('express');
const cors = require('cors')
const path = require('path');
const app = express();

app.use(cors());

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...')
})

const socket = require('socket.io');
const io = socket(server);

const tasks = [];

io.on('connection', (socket) => {
  console.log('New client is connected. No' + socket.id)
  socket.on('greeting', () => {
    console.log('Oh, I\'ve got something from ' + socket.id)
  })
})

// app.use(express.static(path.join(__dirname, '/Client')))

/* 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/Client/public/index.html'));
});
*/

app.use((req,res) => {
  res.status(404).send({ message: 'Not found...' });
})