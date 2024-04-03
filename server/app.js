const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust according to your client app's URL
  }
});

let roomCount = 0;
const roomPrefix = "room";
const maxUsersPerRoom = 2;
const roomUsers = {}; // Keeps track of the number of users in each room

io.on("connection", (socket) => {
  // Log connection details
  const clientIp = socket.handshake.address;
  const connectionTime = new Date().toISOString();
  console.log(`Connection from ${clientIp} at ${connectionTime}`);

  // Find a room with less than 2 users or create a new one
  let assignedRoom;
  for (const [room, count] of Object.entries(roomUsers)) {
    if (count < maxUsersPerRoom) {
      assignedRoom = room;
      break;
    }
  }

  // If all rooms are full, create a new one
  if (!assignedRoom) {
    roomCount++;
    assignedRoom = `${roomPrefix}${roomCount}`;
    roomUsers[assignedRoom] = 0; // Initialize user count for the new room
  }

  // Join the socket to the found or new room
  socket.join(assignedRoom);
  roomUsers[assignedRoom]++; // Increment user count for the assigned room

  console.log(`${socket.id} joined ${assignedRoom}. Total rooms: ${Object.keys(roomUsers).length}`);

  // Broadcast to the room on receiving a message
  socket.on("chat", (message) => {
    io.to(assignedRoom).emit("chat", message);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    roomUsers[assignedRoom]--; // Decrement user count for the room
    console.log(`${socket.id} left ${assignedRoom}.`);
    
    // Cleanup empty rooms
    if (roomUsers[assignedRoom] === 0) {
      delete roomUsers[assignedRoom];
      console.log(`${assignedRoom} is now empty and deleted.`);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));