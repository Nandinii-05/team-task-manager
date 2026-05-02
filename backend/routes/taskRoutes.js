const express = require("express");
const router = express.Router();

const {createTask, getTasks} = require("../controllers/taskController");
const {updateTaskStatus} = require("../controllers/taskController");
const {getTaskSummary} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", createTask);
router.get("/:projectId", authMiddleware, getTasks);
router.put("/update/:taskId", authMiddleware, updateTaskStatus);
router.get("/summary/:projectId", authMiddleware, getTaskSummary);
router.get("/:projectId", getTasks);
router.get("/", authMiddleware, getTasks);

module.exports = router;