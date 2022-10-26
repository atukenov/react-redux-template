var clients = 0;

module.exports = (io, socket) => {
  console.log("User connected");
  socket.on("set nickname", (user) => {
    socket.nickname = user;
  });

  io.sockets.emit("user add", io.engine.clientsCount);

  socket.on("newMessage", (message) => {
    socket.broadcast.emit("receiveMessage", message);
  });
  socket.on("typing", (hidden) => {
    socket.broadcast.emit("isTyping", hidden);
  });

  socket.on("disconnect", () => {
    io.sockets.emit("user add", io.engine.clientsCount);
    console.log("User disconnected");
  });
};
