# Task-Management-App
A Task Management app built with React (frontend) and Express (backend). It allows users to add, edit, delete, and mark tasks as "Completed" or "Pending". The app features task search, simple CRUD operations, and uses JSON for data storage. Follow the setup instructions in the README to run it locally.
Here is the complete `README.md` with the added dependency installation instructions:

---

# Task Management App

A simple Task Management application built with **React** (frontend) and **Express** (backend). Users can create, edit, delete, and mark tasks as "Completed" or "Pending".

### Features:
- Add, edit, and delete tasks
- Search tasks
- Mark tasks as completed or pending

### Tech Stack:
- **Frontend**: React, Axios
- **Backend**: Express, Node.js
- **Data**: Stored in a JSON file

### Setup Instructions:

1. **Backend Setup**:
   - Navigate to the `server` folder:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install express cors
     ```
   - Start the server:
     ```bash
     node index.js
     ```
   - The backend will run on `http://localhost:8000`.

2. **Frontend Setup**:
   - Navigate to the `client` folder:
     ```bash
     cd client
     ```
   - Install dependencies:
     ```bash
     npm install react react-dom axios
     ```
   - Start the React app:
     ```bash
     npm start
     ```
   - The frontend will run on `http://localhost:3000`.

### License:
MIT License
