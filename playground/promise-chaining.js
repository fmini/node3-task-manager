require("../src/db/mongoose");
const User = require("../src/models/user");

User.findByIdAndUpdate("5fb456c67e2a7923d8305359", {
  age: 1,
})
  .then(user => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
