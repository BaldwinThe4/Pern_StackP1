const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("server has connected");
});

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
app.get("/todos", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo");

    res.json(allTodo.rows);
  } catch (err) {
    console.log(err.message);
  }
});
