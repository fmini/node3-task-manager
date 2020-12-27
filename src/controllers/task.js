const e = require("express");
const { response } = require("express");
const { findById } = require("../models/task");
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
  //const allTasks = Task.find({});
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

const readTask = async task => {
  let response = {};
  try {
    const result = await Task.findById(task);
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

const updateTask = () => {};

const deleteTask = () => {};

module.exports = {
  createTask,
  readTask,
  readAllTasks,
  updateTask,
  deleteTask,
};
