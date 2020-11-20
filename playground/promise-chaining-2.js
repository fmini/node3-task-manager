require("../src/db/mongoose");
const { findByIdAndDelete } = require("../src/models/task");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("5fb6f725ed9b1b33003b33fc")
//   .then(() => {
//     return Task.countDocuments({ completed: false });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id, status) => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: status });
  return count;
};

deleteTaskAndCount("5fb851690479f427903d0c9d", false)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
