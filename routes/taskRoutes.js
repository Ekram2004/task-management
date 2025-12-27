const express = require('express');
const { verify, IsAdmin } = require('../controllers/taskControllers');
const { createTask, getTask, updateTask, deleteTask, getAllTasks } = require('../controllers/taskControllers');
const router = express.Router();

router.post("/api/task/", IsAdmin, createTask);
router.get("/api/task/:id",verify, IsAdmin, getTask);
router.put("/api/task/:id", IsAdmin, updateTask);
router.delete("api/task/:id", IsAdmin, deleteTask);
router.get("/api/task/", IsAdmin);

module.exports = router;
