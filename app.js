const express = require("express");
const path = require("path");
const app = express();
const tasksRouter = require("./routes/tasks");

app.use(express.json());
app.use("/api", tasksRouter);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
