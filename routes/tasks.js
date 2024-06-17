const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const validateTask = require("../middleware/validateTask");

// router.get('/', (req,res) => return  res.status(200).send('working'));

router.get("/tasks", tasksController.getAllTasks);
router.get("/tasks/:id", tasksController.getTaskById);
router.post("/tasks", validateTask, tasksController.createTask);
router.put("/tasks/:id", validateTask, tasksController.updateTask);
router.delete("/tasks/:id", tasksController.deleteTask);

module.exports = router;
