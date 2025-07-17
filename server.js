const express = require("express");
const net = require("net");
const mongoose = require("mongoose");
const decoder = require("teltonika-decoder");
const telemetryRoutes = require("./routes/telemetryRoutes");
const { saveTelemetry } = require("./controllers/telemetryController");
const dbConnect = require("./lib/dbConnect");
require("dotenv").config();
dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;
const TCP_PORT = process.env.TCP_PORT || 5001;


// Middleware
app.use(express.json());

// Routes
app.use("/api/telemetry", telemetryRoutes);

// Start Express HTTP server
app.listen(PORT, () => {
  console.log(`🚀 HTTP Server running on port ${PORT}`);
});

// Start TCP Server
const tcpServer = net.createServer((socket) => {
  socket.on("data", async (data) => {
    try {
      const parsed = decoder(data);
      await saveTelemetry(parsed);
    } catch (err) {
      console.error("TCP Data Error:", err.message);
    }
  });
});

tcpServer.listen(TCP_PORT, () => {
  console.log(`📡 TCP Server running on port ${TCP_PORT}`);
});
