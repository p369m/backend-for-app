const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("socket is active");
  socket.on("currLoc", (currLoc) => {
    console.log(currLoc);
    socket.broadcast.emit("trackLoc", currLoc); // Broadcast to all other clients
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
