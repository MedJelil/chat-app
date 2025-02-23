const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static(path.join(__dirname, "./"))); // Path to the frontend folder

io.on("connection", (socket) => {
  console.log("Nouvel utilisateur connecté :", socket.id);

  socket.on("message", (data) => {
    console.log("Message reçu :", data);

    io.emit("message", data); // Diffuser à tous les utilisateurs
  });

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté :", socket.id);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./", "index.html")); // Adjust path if necessary
});
server.listen(3000, "0.0.0.0", () => {
  console.log("Serveur en écoute sur:");
  console.log(" - Local: http://localhost:3000");
  console.log(" - Network: http://<YOUR_LOCAL_IP>:3000");
});
