const express = require("express");
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
const task = require("./routes/task");
const { setupDB } = require("./models/task");
app.use("/api/task/", task);

app.listen(3001, async () => {
  const db = await setupDB();
  console.log("App is listing from port 3001");
});
