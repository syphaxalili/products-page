const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productsRoutes = require("./routes/products");

// Creating our express app
const app = express();

// Connect to DB and start listening for requests on port 4000

const MONGO_URI =
  "mongodb+srv://testUser:testPassword@syphax-cluster.68rkp.mongodb.net/webstore?retryWrites=true&w=majority&appName=Syphax-cluster";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log(`Connected to db & listening for requests on port 4000`);
    });
  })
  .catch((error) => console.log(error));

// Middleware
// ---- Parses request body JSON into JS objects
app.use(express.json());
// ---- Allow cross-origin-requests
app.use(cors());

// Routes
app.use("/api/products", productsRoutes);
