const Task = require("../models/task");

const createTask = async task => {
  const newTask = new Task(task);
  let response = {};
  try {
    const result = await newTask.save();
    response = {
      success: true,
      result,
    };
  } catch (e) {
    response = {
      success: false,
      result: e.message,
    };
  }
  return response;
};

const readAllTasks = async tasks => {
  let response = {};
  try {
    const result = await Task.find();
    response = {
      success: true,
      result,
    };
  } catch (e) {
    response = {
      success: false,
      result: e.message,
    };
  }
  return response;
};

const readTask = async taskId => {
  let response = {};
  try {
    const result = await Task.findById(taskId);
    response = {
      success: true,
      result,
    };
  } catch (e) {
    response = {
      success: false,
      result: e.message,
    };
  }
  return response;
};

const updateTask = async (id, updates, updateTo) => {
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return {
      success: false,
      result: { error: "Invalid updates!" },
    };
  }

  try {
    const task = await Task.findByIdAndUpdate(id, updateTo, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return {
        success: false,
        result: { error: "Task does not exist" },
      };
    }
    return {
      success: true,
      result: task,
    };
  } catch (e) {
    return {
      success: false,
      result: { error: e },
    };
  }
};
const deleteTask = () => {};

module.exports = {
  createTask,
  readTask,
  readAllTasks,
  updateTask,
  deleteTask,
};
