module.exports = {
  onConnect,
  onNameSpace1Connect
}

function onConnect (socket) {
  console.log(socket.id + ' :connected')
  socket.on('disconnect', () => console.log(socket.id + ' disconnected'))
  socket.emit('event', { message: 'hello client', id: socket.id })
  // socket.on('event-res', data => console.log(data));
  socket.on('test', data => {
    socket.broadcast.emit('test-res', data)
  })
  setTimeout(() => {
    socket.emit('test-res', 'test de vui')
  }, 5000)
  socket.on('join', data => {
    socket.join(data)
    socket.to(data).emit('room-joined', 'welcome to room ' + data)
  })
  socket.on('test1', data => {
    socket.to('1234').emit('room-joined', 'welcome to room 1234')
  })
}

function onNameSpace1Connect (socket) {
  socket.on('disconnect', () => console.log(socket.id + ' disconnected'))
  // socket.emit('event', { message: 'hello client', "id": socket.id });
  // socket.on('event-res', data => console.log(data));
  socket.on('test', data => {
    socket.broadcast.emit('test-res', data)
  })
}

/// ///////socket.io emit-cheatsheet

// io.on('connect', onConnectCheatSheet);

// function onConnectCheatSheet (socket) {
//   // sending to the client
//   socket.emit('hello', 'can you hear me?', 1, 2, 'abc')

//   // sending to all clients except sender
//   socket.broadcast.emit('broadcast', 'hello friends!')

//   // sending to all clients in 'game' room except sender
//   socket.to('game').emit('nice game', "let's play a game")

//   // sending to all clients in 'game1' and/or in 'game2' room, except sender
//   socket.to('game1').to('game2').emit('nice game', "let's play a game (too)")

//   // sending to all clients in 'game' room, including sender
//   io.in('game').emit('big-announcement', 'the game will start soon')

//   // sending to all clients in namespace 'myNamespace', including sender
//   io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon')

//   // sending to a specific room in a specific namespace, including sender
//   io.of('myNamespace').to('room').emit('event', 'message')

//   // sending to individual socketid (private message)
//   io.to(`${socketId}`).emit('hey', 'I just met you')

//   // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
//   // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.

//   // sending with acknowledgement
//   socket.emit('question', 'do you think so?', function (answer) {})

//   // sending without compression
//   socket.compress(false).emit('uncompressed', "that's rough")

//   // sending a message that might be dropped if the client is not ready to receive messages
//   socket.volatile.emit('maybe', 'do you really need it?')

//   // specifying whether the data to send has binary data
//   socket.binary(false).emit('what', 'I have no binaries!')

//   // sending to all clients on this node (when using multiple nodes)
//   io.local.emit('hi', 'my lovely babies')

//   // sending to all connected clients
//   io.emit('an event sent to all connected clients')
// };
