let users = []

function userJoin(id, username) {
  
  const user = { id, username } 
  
  users.push(user)

  return user
}

function getCurrentUser(id) {
  return users.find(user => user.id === id)
}

function userLeave(id) {
  const data = users.find(user => user.id == id)

  if (data) {
    users = users.filter(user => user.id != data.id)

    return data
  }
}

function getUsers() {
  return users
}

module.exports = { userJoin, userLeave, getCurrentUser, getUsers }
