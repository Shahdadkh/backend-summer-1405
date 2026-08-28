const express = require("express");
const taskRouter = express.Router();

let dataset = [];

taskRouter.get("/", (req, res) => {
  const datas = dataset;
  res.status(200).json(datas);
});

taskRouter.get("/:id", (req, res) => {
  const datas = dataset;
  const id = req.params.id;
  const result = datas.find((data) => data.id == id);

  if (!result) {
    return res.status(404).json("Not Found");
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

taskRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const item = dataset.find((data) => data.id == id);

  if (!item) {
    return res.status(404).json("Item Not Found");
  }

  const updateData = { ...item, title: title };

  dataset = dataset.filter((data) => data.id != id);
  dataset.push(updateData);

  res.status(200).json(updateData);
});

taskRouter.patch("/:id", (req, res) => {
  const id = req.params.id;
  const item = dataset.find((data) => data.id == id);

  if (!item) {
    return res.status(404).json("Item Not Found");
  }

  const updateData = { ...item, completed: !item.completed };

  dataset = dataset.filter((data) => data.id != id);
  dataset.push(updateData);

  res.status(200).json(updateData);
});

taskRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  const item = dataset.find((data) => data.id == id);

  if (!item) {
    return res.status(404).json("Item Not Found");
  }

  dataset = dataset.filter((data) => data.id != id);

  res.status(200).json(`Item ${id} successfully deleted`);
});

module.exports = { taskRouter };
