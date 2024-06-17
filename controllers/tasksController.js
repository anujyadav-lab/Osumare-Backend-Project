const tasks = require('../models/taskModel');

const getAllTasks = (req, res) => {
    console.log(tasks)
  res.status(200).json(tasks);

};

const getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(200).json(task);
};

const createTask = (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const { title, description } = req.body;
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  task.title = title;
  task.description = description;
  res.status(200).json(task);
};

const deleteTask = (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).send();
};

module.exports = {getAllTasks,getTaskById,createTask,updateTask,deleteTask};
