const express = require("express");
const { loadTasks, saveTasks } = require("../../utils/task.util");
const taskRouter = express.Router();

let dataset = loadTasks();

taskRouter.get("/", (req, res) => {
  const { completed, search, page, limit } = req.query;
  let datas = dataset;

  // Filtering
  if (completed !== undefined) {
    if (completed !== "true" && completed !== "false") {
      return res.status(400).json({
        message: "completed must be true or false",
      });
    }

    datas = datas.filter(
      (data) => data.completed === (completed === "true")
    );
  }

  // Search
  if (search) {
    datas = datas.filter((data) =>
      data.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Pagination
  if (page !== undefined || limit !== undefined) {
    const currentPage = Number(page) || 1;
    const currentLimit = Number(limit) || 10;

    if (currentPage < 1 || currentLimit < 1) {
      return res.status(400).json({
        message: "page and limit must be greater than 0",
      });
    }

    const start = (currentPage - 1) * currentLimit;
    const end = start + currentLimit;

    datas = datas.slice(start, end);
  }

  res.status(200).json(datas);
});

taskRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = dataset.find((data) => data.id === id);

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
  const id = parseInt(req.params.id);
  const title = req.body.title;
  const item = dataset.find((data) => data.id === id);

  if (!item) {
    return res.status(404).json({ message: "not found" });
  }

  const updateData = { ...item, title: title };

  dataset = dataset.filter((data) => data.id !== id);
  dataset.push(updateData);
  saveTasks(dataset);

  res.status(200).json({ ...updateData, message: "success" });
});

taskRouter.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = dataset.find((data) => data.id === id);

  if (!item) {
    return res.status(404).json({ message: "not found" });
  }

  const updateData = { ...item, completed: !item.completed };

  dataset = dataset.filter((data) => data.id !== id);
  dataset.push(updateData);
  saveTasks(dataset);

  res.status(200).json({ ...updateData, message: "success" });
});

taskRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = dataset.find((data) => data.id === id);

  if (!item) {
    return res.status(404).json({ message: "not found" });
  }

  dataset = dataset.filter((data) => data.id !== id);
  saveTasks(dataset);

  res.status(200).json({ message: "Item successfully deleted" });
});

module.exports = { taskRouter };
