const messages = [], moment = require('moment')

function formatMessage(username, text) {
    return { username, text, time:moment().format('h:mm a')} 
}

function writeMessage(id, username, message) {
    const data = { id, username, message } 

    messages.push(data)
    return data
}

function getMessages() {
    return messages
  }


module.exports = { formatMessage, writeMessage, getMessages }