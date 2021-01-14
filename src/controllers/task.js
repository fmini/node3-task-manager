const Task = require('../models/task');

const createTask = async (task, owner) => {
  const newTask = new Task({ ...task, owner });
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

const readTask = async (taskId, owner) => {
  let response = {};
  try {
    const task = await Task.findOne({ _id: taskId, owner });
    if (!task) {
      response = {
        success: false,
        result: 'Task not found',
      };
    } else {
      response = {
        success: true,
        result: task,
      };
    }
  } catch (e) {
    response = {
      success: false,
      result: e.message,
    };
  }
  return response;
};

const updateTask = async (id, updates) => {
  const fields = Object.keys(updates);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = fields.every(field =>
    allowedUpdates.includes(field)
  );

  if (!isValidOperation) {
    return {
      success: false,
      result: { error: 'Invalid updates!' },
    };
  }

  try {
    const task = await Task.findById(id);

    fields.forEach(field => (task[field] = updates[field]));
    await task.save();

    if (!task) {
      return {
        success: false,
        result: { error: 'Task does not exist' },
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
const deleteTask = async delID => {
  let response = {};
  try {
    const delTask = await Task.findByIdAndDelete(delID);
    if (!delTask) {
      response = {
        success: false,
        result: { error: 'Task does not exist' },
      };
    } else {
      response = {
        success: true,
        result: delTask,
      };
    }
  } catch (e) {
    response = {
      success: false,
      result: { error: e.message },
    };
  }
  return response;
};

module.exports = {
  createTask,
  readTask,
  readAllTasks,
  updateTask,
  deleteTask,
};
