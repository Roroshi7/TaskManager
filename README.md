<<<<<<< HEAD
# TaskManagerPro
=======
# TaskMaster Pro

A full-stack productivity and task management application built with React, Node.js, and MongoDB.

## Features

- User Authentication (JWT)
- CRUD Operations for Tasks
- Task Priority and Status Management
- Due Dates and Reminders
- Task Filtering and Sorting
- Analytics Dashboard
- Responsive Design

## Tech Stack

- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Authentication: JWT
- Charts: Chart.js

## Project Structure

```
taskmaster-pro/
├── client/             # React frontend
├── server/             # Node.js backend
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Tasks
- GET /api/tasks - Get all tasks
- POST /api/tasks - Create a new task
- GET /api/tasks/:id - Get a specific task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

## License

MIT 
>>>>>>> 8b18317 (Initial commit)
