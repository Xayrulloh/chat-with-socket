const path = require('path'), http = require('http'), express = require('express'), socketio = require('socket.io'), { formatMessage, getMessages, writeMessage } = require('./utils/messages'), { userJoin, getCurrentUser, userLeave, getUsers } = require('./utils/users'), PORT = process.env.PORT || 5000, botName = 'ChatCord Bot'
const app = express(), server = http.createServer(app), io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
  socket.on('joinChat', ({username}) => {
    const user = userJoin(socket.id, username)
    
    writeMessage(socket.id, username, formatMessage(botName, `${user.username} has joined the chat`))
    socket.emit('message', getMessages())
    socket.emit('users', {users: getUsers()})

    socket.broadcast.emit('message', getMessages())
    socket.broadcast.emit('users', {users: getUsers()})
  })
  
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id)
    
    writeMessage(socket.id, user.username, formatMessage(user.username, msg))
    
    socket.emit('message', getMessages())
    socket.broadcast.emit('message', getMessages())

    
  })
  
  
  
  socket.on('disconnect', () => {
    const user = userLeave(socket.id)
  
    if (user) {
      writeMessage(socket.id, user.username, formatMessage(botName, `${user.username} has leaved the chat`))
      
      socket.emit('message', getMessages())
      socket.emit('users', {users: getUsers()})

      socket.broadcast.emit('message', getMessages())
      socket.broadcast.emit('users', {users: getUsers()})
    }
  })
})

server.listen(PORT, () => console.log('Server is running on http://localhost:' + PORT))



