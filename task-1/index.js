const express = require("express");
const { taskRouter } = require("./routes/tasks");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/files", express.static("uploads"));
app.use("/tasks", taskRouter);

app.listen(port, () => console.log(`Server running on localhost:${port}`));
