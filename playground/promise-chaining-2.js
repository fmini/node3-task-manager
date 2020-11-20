require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndDelete("5fb6f725ed9b1b33003b33fc")
  .then(() => {
    return Task.countDocuments({ completed: false });
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
