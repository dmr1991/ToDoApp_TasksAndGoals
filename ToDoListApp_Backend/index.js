const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;
const authMiddleware = require("./middleware");

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

let tasks = [];
let goals = [];

app.get("/getTasks", (req, res) => res.status(200).json(tasks));
app.get("/getGoals", (req, res) => res.status(200).json(goals));

app.post("/addTask", (req, res) => {
  const { name, description, dueDate } = req.body;

  if (!name || !description || !dueDate) {
    return res.status(400).json({ error: "Missing task fields (title, description, or date)" });
  }

  tasks.push(req.body);
  res.status(200).json({ message: "Task added successfully" });
});


app.post("/addGoal", (req, res) => {
  const { name, description, dueDate } = req.body;

  if (!name || !description || !dueDate) {
    return res.status(400).json({ error: "Missing goal fields (name, description, or dueDate)" });
  }

  goals.push(req.body);
  res.status(200).json({ message: "Goal added successfully" });
});

app.delete("/removeTask", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Task id is required" });
  }

  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);

  if (tasks.length === initialLength) {
    // cant delete because no task id is found
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json({ message: "Task removed successfully" });
});


app.delete("/removeGoal", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Goal id is required" });
  }

  const initialLength = goals.length;
  goals = goals.filter((t) => t.id !== id);

  if (goals.length === initialLength) {
    return res.status(404).json({ error: "Goal not found" });
  }

  res.status(200).json({ message: "Goal removed successfully" });
});



app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
