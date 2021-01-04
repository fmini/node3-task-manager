const express = require("express");
const router = new express.Router();
const { taskController } = require("../controllers");
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
  const taskId = req.params.id; // don't use _id as a var name.
  const { success, result } = await taskController.readTask(taskId);
  console.log(success, result);

  if (!success) {
    return res.status(404).send({
      error: result,
    });
  }
  res.status(200).send(result);
});

router.patch("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const { success, result } = await taskController.updateTask(
    id,
    updates,
  );

  if (!success) {
    switch (result.error) {
      case "Invalid updates!":
        res.status(406).send(result);
        return;
      case "Task does not exist":
        res.status(404).send(result);
        return;
      default:
        res.status(400).send(result);
        return;
    }
  }
  res.status(200).send(result);
});

router.delete("/tasks/:id", async (req, res) => {
  const delID = req.params.id;
  const { success, result } = await taskController.deleteTask(delID);
  if (!success) {
    switch (result.error) {
      case "Task does not exist":
        res.status(404).send(result);
        return;
      default:
        res.status(400).send(result)
        return;
    }
  }
  res.status(200).send(result);
});

module.exports = router;
