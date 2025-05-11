const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const authMiddleware = require('./middleware');

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

let tasks = [];
let goals = [];

app.get('/getTasks', (req, res) => res.json(tasks));
app.get('/getGoals', (req, res) => res.json(goals));

app.post('/addTask', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.json({ message: 'Task added successfully' });
});

app.post('/addGoal', (req, res) => {
  const goal = req.body;
  goals.push(goal);
  res.json({ message: 'Goal added successfully' });
});

app.delete('/removeTask', (req, res) => {
  const { id } = req.body;
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: 'Task removed successfully' });
});

app.delete('/removeGoal', (req, res) => {
  const { id } = req.body;
  goals = goals.filter(g => g.id !== id);
  res.json({ message: 'Goal removed successfully' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
