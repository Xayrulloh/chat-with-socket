const chatForm = document.getElementById('chat-form'), chatMessages = document.querySelector('.chat-messages'), userList = document.getElementById('users'), socket = io()

const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

socket.emit('joinChat', { username })

socket.on('users', (users) => {
  outputUsers(users)
}) 

socket.on('message', (data) => {
  outputMessage(data)

  chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', e => {
  e.preventDefault()

  let msg = e.target.elements.msg.value
  msg = msg.trim()

  if (!msg) return false

  socket.emit('chatMessage', msg)

  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

function outputMessage(data) {
  document.querySelector('.chat-messages').innerHTML = null

  data.forEach(message => {
    const div = document.createElement('div')
    div.classList.add('message')
    const p = document.createElement('p')
    p.classList.add('meta')
    p.innerText = message.message.username
    p.innerHTML += `<span>${message.message.time}</span>`
    div.appendChild(p)
    const para = document.createElement('p')
    para.classList.add('text')
    para.innerText = message.message.text
    div.appendChild(para)
    document.querySelector('.chat-messages').appendChild(div)
  })
}


function outputUsers(users) {
  userList.innerHTML = ''
  users.users.forEach((user) => {
    const li = document.createElement('li')
    li.innerText = user.username
    userList.appendChild(li)
  })
}

document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave teh chatroom?')
  leaveRoom ? window.location = '../index.html' : ''
})

