const express = require("express");
const app = express();
const openAI = require("./router/openAI");
require("dotenv").config();

app.use(express.json());

app.use(openAI);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
