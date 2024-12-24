import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [taskData, setTaskData] = useState({ title: "", description: "", status: "" });

  // Function to fetch all tasks
  const getAllTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/Tasks");
      console.log(res.data);
      setTasks(res.data);
      setFilteredTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  // Function to handle search
  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredTask = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchText) ||
        task.description.toLowerCase().includes(searchText)
    );
    setFilteredTasks(filteredTask);
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:8000/Task/${id}`);
      console.log("Deleted task:", res.data);
      setTasks(res.data);
      setFilteredTasks(res.data);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Add or Edit task
  const handleOnRecord = () => {
    setTaskData({ title: "", description: "", status: "Pending" });
    setIsModeOpen(true);
  };

  // Close the modal
  const closeModel = () => {
    setIsModeOpen(false);
    getAllTasks();
  };

  // Handle data input
  const handleDataChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // Handle checkbox change
  const handleStatusChange = (e) => {
    setTaskData({ ...taskData, status: e.target.checked ? "Completed" : "Pending" });
  };

  // Submit task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskData.id) {
      await axios.patch(`http://localhost:8000/Task/${taskData.id}`, taskData).then((res) => {
        console.log(res);
      });
    } else {
      await axios.post("http://localhost:8000/Task", taskData).then((res) => {
        console.log(res);
      });
    }
    closeModel();
    setTaskData({ title: "", description: "", status: "Pending" });
  };

  // Update task
  const handleUpdate = (task) => {
    setTaskData(task);
    setIsModeOpen(true);
  };

  return (
    <>
      <div className="container">
        <h3>Task Management</h3>
        <div className="input-search">
          <input
            type="search"
            placeholder="Enter the text to search"
            onChange={handleSearchChange}
          />
          <button className="btn green" onClick={handleOnRecord}>Add Task</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks &&
              filteredTasks.map((task, index) => {
                return (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={task.status === "Completed"}
                        onChange={() => handleStatusChange(task)}
                      />
                    </td>
                    <td>
                      <button className="btn green" onClick={() => handleUpdate(task)}>Edit</button>
                    </td>
                    <td>
                      <button
                        className="btn red"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {isModeOpen && (
          <div className="model">
            <div className="model-content">
              <span className="close" onClick={closeModel}>
                &times;
              </span>
              <h2>{taskData.id ? "Update Task" : "Add Task"}</h2>
              <div className="input-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  value={taskData.title}
                  name="title"
                  id="title"
                  onChange={handleDataChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  value={taskData.description}
                  name="description"
                  id="description"
                  onChange={handleDataChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="status">Status</label>
                <input
                  type="checkbox"
                  checked={taskData.status === "Completed"}
                  onChange={handleStatusChange}
                />
                <label>{taskData.status}</label>
              </div>
              <button className="btn green" onClick={handleSubmit}>
                {taskData.id ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
