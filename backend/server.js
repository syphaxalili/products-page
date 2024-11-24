const express = require("express");
const mongoose = require("mongoose");
const WebSocket = require("ws");
const cors = require("cors");
const productsRoutes = require("./routes/products");

const app = express();

// Middleware
// ---- Parses request body JSON into JS objects
app.use(express.json());
// ---- Allow cross-origin-requests
app.use(cors());

// Connect to DB and start listening for requests on port 4000
const MONGO_URI =
  "mongodb+srv://testUser:testPassword@syphax-cluster.68rkp.mongodb.net/webstore?retryWrites=true&w=majority&appName=Syphax-cluster";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    const server = app.listen(4000, () => {
      console.log(`Connected to db & listening for requests on port 4000`);
    });

    const wss = new WebSocket.Server({ server });

    wss.broadcast = (data) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    };

    wss.on("connection", (ws) => {
      console.log("A new WebSocket client connected");

      // Listen for messages from the client
      ws.on("message", (message) => {
        console.log("Received message: ", message);
      });

      // Send a JSON-formatted message to the client when they connect
      ws.send(
        JSON.stringify({
          type: "WELCOME",
          payload: "Welcome to the WebSocket server!",
        })
      );
    });

    // Attach WebSocket server to the request object
    app.use((req, res, next) => {
      req.wss = wss;
      next();
    });

    // Routes
    app.use("/api/products", productsRoutes);
  })
  .catch((error) => console.log(error));
