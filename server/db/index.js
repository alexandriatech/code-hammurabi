const db = require("./models");

db.sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((e) => console.log("error", e));

module.exports = {
  db,
};
