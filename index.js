const express = require("express");
const app = express();

// Enviornment Variables
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
