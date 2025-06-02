

---

# **TaskMaster Pro** 🧠✅

*A full-stack productivity and task management application built with React, Node.js, and MongoDB.*

---

## 🚀 Features

* 🔐 **User Authentication** (JWT-based)
* 📝 **Create, Read, Update, Delete (CRUD)** for tasks
* 🎯 **Task Priority & Status** tracking (To Do, In Progress, Done)
* ⏰ **Due Dates & Reminders**
* 🔎 **Advanced Filtering & Sorting**
* 📊 **Interactive Analytics Dashboard** (using Chart.js)
* 📱 **Responsive Design** with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer          | Technologies          |
| -------------- | --------------------- |
| Frontend       | React, Tailwind CSS   |
| Backend        | Node.js, Express.js   |
| Database       | MongoDB Atlas         |
| Authentication | JWT (JSON Web Tokens) |
| Charts         | Chart.js              |

---

## 📁 Project Structure

```
taskmaster-pro/
├── client/             # React frontend
│   ├── src/
│   └── .env
├── server/             # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── .env
└── README.md
```

---

## 🧩 Setup Instructions

### ✅ Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

---

### ✅ Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` directory:

   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:

   ```bash
   npm start
   ```

---

## 📡 API Endpoints

### 🔐 **Authentication**

* `POST /api/auth/register` — Register a new user
* `POST /api/auth/login` — Authenticate user
* `GET /api/auth/me` — Get current logged-in user info

### 🗂 **Task Management**

* `GET /api/tasks` — Fetch all tasks
* `POST /api/tasks` — Create a new task
* `GET /api/tasks/:id` — Fetch a task by ID
* `PUT /api/tasks/:id` — Update a task
* `DELETE /api/tasks/:id` — Delete a task

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 💡 Future Enhancements (Optional)

* ✅ Email Notifications for reminders
* ✅ Drag-and-Drop task reordering
* ✅ Calendar View integration
* ✅ Team collaboration features

---

Let me know if you'd like a `CONTRIBUTING.md` file or a `deployment guide` added to this.
