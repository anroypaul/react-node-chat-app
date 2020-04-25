const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 5000;

let currentOnline = 0;

server.listen(PORT);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  let addedUser = false;

  // when the client emits 'add user', this listens and executes
  socket.on("new-user", (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++currentOnline;
    addedUser = true;
    socket.emit("login", {
      currentOnline: currentOnline,
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit("user-connected", {
      username: socket.username,
      currentOnline: currentOnline,
    });
  });

  // when the client emits 'new message', this listens and executes
  socket.on("new-message", (message) => {

    console.log('new message', message)
    // we tell the client to execute 'new message'
    socket.broadcast.emit("new-message", {
      username: socket.username,
      text: message,
      date: Date.now()
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on("typing", () => {
    socket.broadcast.emit("typing", {
      username: socket.username,
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on("stop-typing", () => {
    socket.broadcast.emit("stop-typing", {
      username: socket.username,
    });
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", () => {
    if (addedUser) {
      --currentOnline;

      socket.broadcast.emit("user-disconnected", {
        username: socket.username,
        currentOnline: currentOnline,
      });
    }
  });
});
