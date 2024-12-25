const express = require("express");
const app = express();
const port = 8000;
const Task = require("./Details.json"); // Changed from User to Task
const cors = require("cors");
const fs = require("fs");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

// Display all tasks  
app.get("/Tasks", (req, res) => {
  return res.json(Task);
});

// Delete task  
app.delete("/Task/:id", (req, res) => {
  let id = Number(req.params.id);
  let filteredTasks = Task.filter((task) => task.id !== id); // Changed from User to Task
  fs.writeFile("./Details.json", JSON.stringify(filteredTasks), (err, data) => {
    return res.json(filteredTasks);
  });
});

// Add task  
app.post("/Task", (req, res) => {
  let { title, description, status } = req.body;  
  if (!title || !description || !status) {
    return res.status(400).send({ message: "All fields are required" });
  }
  let id = Date.now();
  Task.push({ id, title, description, status });  
  fs.writeFile("./Details.json", JSON.stringify(Task), (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Failed to add task" });
    }
    return res.json({ message: "Task added successfully" });
  });
});

// Update task 
app.patch("/Task/:id", (req, res) => {
  let id = Number(req.params.id);
  let { title, description, status } = req.body;  
  if (!title || !description || !status) {
    return res.status(400).send({ message: "All fields are required" });
  }
  let index = Task.findIndex((task) => task.id == id);  
  Task.splice(index, 1, { ...req.body });  
  fs.writeFile("./Details.json", JSON.stringify(Task), (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Failed to update task" });
    }
    return res.json({ message: "Task updated successfully" });
  });
});

app.listen(port, (err) => {
  console.log(`App is running on port ${port}`);
});
