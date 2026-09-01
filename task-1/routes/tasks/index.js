const express = require("express");
const { loadTasks, saveTasks } = require("../../utils/task.util");
const taskRouter = express.Router();

let dataset = loadTasks();

taskRouter.get("/", (req, res) => {
  const datas = dataset;
  res.status(200).json(datas);
});

taskRouter.get("/:id", (req, res) => {
  const datas = dataset;
  const id = req.params.id;
  const result = datas.find((data) => data.id == id);

  if (!result) {
    return res.status(404).json({ message: "not found" });
  }

  res.status(200).json({ ...result, message: "success" });
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
  saveTasks(dataset);
  res.status(201).json({ ...newData, message: "success" });
});

taskRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const item = dataset.find((data) => data.id == id);

  if (!item) {
    return res.status(404).json({ message: "not found" });
  }

  const updateData = { ...item, title: title };

  dataset = dataset.filter((data) => data.id != id);
  dataset.push(updateData);
  saveTasks(dataset);

  res.status(200).json({ ...updateData, message: "success" });
});

taskRouter.patch("/:id", (req, res) => {
  const id = req.params.id;
  const item = dataset.find((data) => data.id == id);

  if (!item) {
    return res.status(404).json({ message: "not found" });
  }

  const updateData = { ...item, completed: !item.completed };

  dataset = dataset.filter((data) => data.id != id);
  dataset.push(updateData);
  saveTasks(dataset);

  res.status(200).json({ ...updateData, message: "success" });
});

taskRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  const item = dataset.find((data) => data.id == id);

  if (!item) {
    return res.status(404).json({ message: "not found" });
  }

  dataset = dataset.filter((data) => data.id != id);
  saveTasks(dataset);

  res.status(200).json({ message: "Item successfully deleted" });
});

module.exports = { taskRouter };
