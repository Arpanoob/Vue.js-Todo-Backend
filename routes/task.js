const express = require("express");

const router = express.Router();
router.use(express.json());

const { db } = require("../models/task");

router.get("/", (req, res) => {
  db.Task.findAll().then((task) => {
    res.json(task);
  });
});
router.get("/:isCompleted", async (req, res) => {
  try {
    // Convert the isCompleted parameter to a boolean
    const isCompleted = req.params.isCompleted === 'true';

    // Query the database based on the boolean value
    const tasks = await db.Task.findAll({ where: { isCompleted: isCompleted } });
    res.send(tasks);
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", (req, res) => {
  console.log(req.body);
  db.Task.create(req.body).then((task) => {
    res.json(task);
  });
});
router.delete("/:id", (req, res) => {
  db.Task.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.send("Deleted");
  });
});
router.put("/:id", async (req, res) => {
  console.log(req.body);
  try {
    const taskId = req.params.id;
    const updatedValues = req.body;

    // Find the task by ID
    const task = await db.Task.findOne({ where: { id: taskId } });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task's properties
    Object.assign(task, updatedValues);

    // Save the updated task
    await task.save();

    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
