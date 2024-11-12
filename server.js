const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/routes");
const app = express();
const port = 3001;
const uri = "";

app.use(router);

// mongoose.connect(uri)

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
