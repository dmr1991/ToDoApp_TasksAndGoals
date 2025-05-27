const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;
const authMiddleware = require("./middleware");
const { Task, Goal } = require("./models");

// Conectar a MongoDB
require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// GET all tasks
app.get("/getTasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// GET all goals
app.get("/getGoals", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: "Error fetching goals" });
  }
});

// POST new task
app.post("/addTask", async (req, res) => {
  const { name, description, dueDate } = req.body;

  if (!name || !description || !dueDate) {
    return res
      .status(400)
      .json({ error: "Missing task fields (name, description, or dueDate)" });
  }

  try {
    const newTask = new Task({ name, description, dueDate });
    await newTask.save();
    res.status(200).json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ error: "Error saving task" });
  }
});

// POST new goal
app.post("/addGoal", async (req, res) => {
  const { name, description, dueDate } = req.body;

  if (!name || !description || !dueDate) {
    return res
      .status(400)
      .json({ error: "Missing goal fields (name, description, or dueDate)" });
  }

  try {
    const newGoal = new Goal({ name, description, dueDate });
    await newGoal.save();
    res.status(200).json({ message: "Goal added successfully", goal: newGoal });
  } catch (error) {
    res.status(500).json({ error: "Error saving goal" });
  }
});

// DELETE task by ID
app.delete("/removeTask/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Task id is required" });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

// DELETE goal by ID
app.delete("/removeGoal/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Goal id is required" });
  }

  try {
    const deletedGoal = await Goal.findByIdAndDelete(id);
    if (!deletedGoal) {
      return res.status(404).json({ error: "Goal not found" });
    }
    res.status(200).json({ message: "Goal removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting goal" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
