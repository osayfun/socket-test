var io = require('socket.io-client')

var socket = io.connect('http://localhost:6969/');

socket.on('broadcast', (data) => {
  console.log(data)
})
