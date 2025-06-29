import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// 🔐 Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (!req.user?.uid) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// 📥 GET all tasks for the logged-in user
router.get("/", requireAuth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.uid });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// ➕ POST a new task
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = await Task.create({
      title,
      userId: req.user.uid,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// ✏️ PATCH update task
router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.uid },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// ❌ DELETE a task
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.uid });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
