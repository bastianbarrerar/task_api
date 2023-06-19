const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json()); //req.body req.params

//routes//

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description, status } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description, status) VALUES ($1, $2) RETURNING *",
      [description, status]
    );
    res.status(200).json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo ORDER BY status, todo_id DESC");
    res.status(200).json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.status(200).json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.status(200).json("Todo was updadated!");
  } catch (err) {
    console.error(err.message);
  }
});


//update status todo
app.put("/todos/status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET status = $1 WHERE todo_id = $2",
      [status, id]
    );
    res.status(200).json("Todo was updadated!");
  } catch (err) {
    console.error(err.message);
  }
});


//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.status(200).json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
