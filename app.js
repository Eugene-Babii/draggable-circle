import express from "express";
import { resolve, join, basename } from "path";
import { createServer } from "http";
import { Server } from "socket.io";

const __dirname = resolve();
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("circle move", (coord) => {
    io.emit("circle move", coord);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
