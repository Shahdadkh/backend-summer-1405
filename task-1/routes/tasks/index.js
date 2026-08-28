const express = require("express");
const taskRouter = express.Router();

const dataset = [];

taskRouter.get("/", (req, res) => {
  const data = dataset;
  res.status(200).json(data);
});

taskRouter.get("/:id", (req, res) => {
  const datas = dataset;
  const id = req.params.id;
  const result = datas.find((data) => data.id == id);

  if (!result) {
    res.status(404).json("Not Found");
  }

  res.status(200).json(result);
});

taskRouter.post("/", (req, res) => {
  const nextId =
    dataset.length > 0 ? Math.max(...dataset.map((data) => data.id)) + 1 : 1;
  const title = req.body.title;

  const newData = {
    id: nextId,
    title: title,
    completed: false,
    createdAt: new Date(),
  };

  dataset.push(newData);
  res.status(200).json(newData);
});

module.exports = { taskRouter };
