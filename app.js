var http        = require('http');
var express     = require('express');
var bodyParser  = require('body-parser');

var app     = express();
var server  = http.createServer(app);
var io      = require('socket.io').listen(server);

var sockets = []

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

io.on('connection', (socket) => {
  sockets.push(socket);
  console.log(socket.id);
  console.log('new user');
})

app.post('/', (req, res, next) => {
  if( req.body.to ){

    io.sockets.connected[req.body.to].emit('broadcast', {'individual': true});
  }else{
    io.sockets.emit('broadcast', req.body)
  }

  res.send('got');
})

server.listen(6969, () => {
  console.log("Listening")
})
