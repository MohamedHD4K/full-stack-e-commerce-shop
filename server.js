const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/routes");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3002;
const url = process.env.URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
