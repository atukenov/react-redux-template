const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);

//Connect DB
connectDB();

// Init Socket.io
const sockets = require("./middleware/socketio");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  sockets(io, socket);
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Init middleware
app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));
app.use("/upload", express.static("upload"));

// Define routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/logo", require("./routes/api/logo"));
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/project", require("./routes/api/project"));
app.use("/api/image", require("./routes/api/image"));
app.use("/api/chat", require("./routes/api/chat"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5050;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
  app.use((req, res, next) => {
    if (req.secure) next();
    else res.redirect(`https://'${req.headers.host}${req.url}`);
  });
}
