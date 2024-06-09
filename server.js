const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all requests

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket is active");
  socket.on("currLoc", (currLoc) => {
    console.log(currLoc);
    socket.broadcast.emit("trackLoc", currLoc); // Broadcast to all other clients
  });
});

// Use environment variable for port
const PORT = process.env.PORT || 10000;

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
