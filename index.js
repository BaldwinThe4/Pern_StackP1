const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("server has connected");
});

app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err.message);
  }
});
