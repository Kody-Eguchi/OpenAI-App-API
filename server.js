const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("test");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
