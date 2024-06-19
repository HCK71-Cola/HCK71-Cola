const express = require("express");
const { createServer } = require("http");
// const { join } = require('node:path');
const { Server } = require("socket.io");
const { Message } = require("./models/index");
const cors = require("cors");
const { userCtrl } = require("./controllers/userCtrl");

const app = express();
const server = createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.post("/register", userCtrl.register);
app.post("/login", userCtrl.login);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("error", (error) => {
  console.log(error);
});

io.on("connection", (socket) => {
  console.log("a user connected njay");

  socket.on("messages", async () => {
    const messages = await Message.findAll();
    io.emit("messages", messages);
  });

  socket.on("messages:post", async (body) => {
    console.log(body);
    await Message.create(body);

    const messages = await Message.findAll();
    io.emit("messages", messages);
  });
});

server.listen(3000, () => console.log(3000));
