const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

const goalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

const Task = mongoose.model("Task", taskSchema);
const Goal = mongoose.model("Goal", goalSchema);

module.exports = { Task, Goal };
