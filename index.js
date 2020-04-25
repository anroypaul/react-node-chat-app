const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 5000;

const users = {};
let currentOnline = 0;

server.listen(PORT);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  socket.on('new-user', name => {
    console.log(name);
    
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
    socket.broadcast.emit('current-online', currentOnline++);
  })

  socket.on("send-chat-message", message => {
    console.log(message)
    message.name = users[socket.id];
    socket.broadcast.emit('chat-message', message);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    socket.broadcast.emit('current-online', currentOnline--);
    delete users[socket.id]
  })
});
