const express = require("express");
const taskRouter = express.Router();

taskRouter.get("/lists", (req, res) => {
  res.json("tasks up");
});

module.exports = { taskRouter };
