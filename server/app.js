if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { Message } = require("./models/index");
const cors = require("cors");
const { userCtrl } = require("./controllers/userCtrl");

const app = express();
const server = createServer(app);

const port = process.env.PORT || 3000;

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

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("messages", async () => {
    const messages = await Message.findAll();
    io.emit("messages", messages);
  });

  socket.on("messages:post", async (body) => {
    let UserId = body.userId;
    let text = body.text;
    await Message.create({
      text,
      UserId,
    });
    const messages = await Message.findAll();
    io.emit("messages", messages);
  });
});

server.listen(port, () => console.log("Server running on port 3000"));
