const { response } = require("express");
const Task = require("../models/task");

const createTask = async task => {
  const newTask = new Task(task);
  let response = {};
  try {
    const saved = await newTask.save();
    response = {
      success: true,
      result: saved,
    };
  } catch (e) {
    response = {
      success: false,
      result: e.message,
    };
  }
  return response;
};

const readAllTasks = () => {};

const readTask = () => {};

const updateTask = () => {};

const deleteTask = () => {};

module.exports = {
  createTask,
  readTask,
  readAllTasks,
  updateTask,
  deleteTask,
};
