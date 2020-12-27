const { response } = require("express");
const express = require("express");
const router = new express.Router();
const { taskController } = require("../controllers");
const { readAllTasks } = require("../controllers/task");
const task = require("../controllers/task");
const Task = require("../models/task");

router.post("/tasks", async (req, res) => {
  // Only take the description, since it's all we need to create an object. Throw away any other values sent on the req.body.
  const { description } = req.body;
  // Desctructure `success` and `result` from the object returned by taskController.createTask()
  const { success, result } = await taskController.createTask({ description });
  console.log(success, result);
  if (!success) {
    return res.status(400).send({
      error: result,
    });
  }
  res.status(200).send(result);
});

router.get("/tasks", async (req, res) => {
  //const { description, completed } = req.body;
  const { success, result } = await taskController.readAllTasks();
  console.log(success, result);
  if (!success) {
    return res.status(400).send({
      error: result,
    });
  }
  res.status(200).send(result);
});

router.get("/tasks/:id", async (req, res) => {
  const id = req.params.id; // don't use _id as a var name.
  const { success, result } = await taskController.readTask(id);
  console.log(success, result);

  if (!success) {
    return res.status(400).send({
      error: result,
    });
  }
  res.status(200).send(result);
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(406).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send();
    }
    res.status(202).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
