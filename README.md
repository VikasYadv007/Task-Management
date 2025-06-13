# Task Management Application

A full-stack task management application with authentication, task CRUD operations, and Excel export functionality.

## Project Structure

- `/frontend`: React.js frontend application
- `/backend1`: Node.js authentication API
- `/backend2`: Django REST Framework API for task management and Excel export

## Features

- **User Authentication (Node.js Backend):** Registration, login, JWT-based authentication
- **Task Management (Django REST Framework Backend):** Create, read, update, delete tasks (Title, Description, Effort, Due Date)
- **Excel Export:** Export tasks to Excel, downloadable from the frontend

---

## Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

---

Follow these steps to start all parts of the project:

### 1. Start the Node.js Backend (Authentication)
- Open a terminal window.
- Go to the backend1 directory:
  ```sh
  cd backend1
  ```
- Install dependencies (first time only):
  ```sh
  npm install
  ```
- Start the server:
  ```sh
  npm run dev
  ```
- You should see: `Authentication server running on port 3001`

### 2. Start the Django Backend (Task API)
- Open another terminal window.
- Go to the backend2 directory:
  ```sh
  cd backend2
  ```
- (Optional, first time) Install Python dependencies:
  ```sh
  pip install -r requirements.txt
  ```
- Run migrations (first time or after model changes):
  ```sh
  python manage.py migrate
  ```
- Start the Django server:
  ```sh
  python manage.py runserver
  ```
- You should see: `Starting development server at http://127.0.0.1:8000/`

### 3. Start the React Frontend
- Open another terminal window.
- Go to the frontend directory:
  ```sh
  cd frontend
  ```
- Install dependencies (first time only):
  ```sh
  npm install
  ```
- Start the React app:
  ```sh
  npm start
  ```
- Your browser should open at `http://localhost:3000` (or open it manually).

---

## Stopping the Servers
- In each terminal window, press `Ctrl + C` to stop the running server.

---

## Usage

1. Open your browser and go to [http://localhost:3000](http://localhost:3000)
2. Register a new account or log in with your credentials.
3. Create, view, edit, or delete tasks using the interface.
4. Use the "Export Excel" button to download your tasks as an Excel file.
5. Log out when finished using the "Logout" button in the top right.

If you encounter any issues, check the terminal windows for error messages.

---

## Notes
- Make sure you have Node.js, npm, Python, and pip installed on your system.
- If you have issues with ports, make sure nothing else is running on 3000, 3001, or 8000.