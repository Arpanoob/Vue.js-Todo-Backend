const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const task = require("./routes/task");
const { setupDB } = require("./models/task");
app.use("/api/task/", task);

app.listen(3001, async () => {
  const db = await setupDB();
  console.log("App is listing from port 3001");
});
