const { DataTypes } = require("sequelize");
const sequelize = require("./db")();
let db = {};
async function setupDB() {
  try {
    db.Task = sequelize.define("Task", {
      text: { type: DataTypes.STRING, allowNull: false },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
    await sequelize.sync({ force: true });
    await db.Task.create({ text: "Dental" });
    await db.Task.create({ text: "Return Book" });
    await db.Task.create({ text: "Finish this cource" });
    return db;
  } catch (e) {
    console.error(e);
  }
}

module.exports.db = db;
module.exports.setupDB = setupDB;
