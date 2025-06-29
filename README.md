# Todo Task Management Web App 📝

A full-stack Todo application built for the Katomaran Hackathon.

## 🚀 Features

- OAuth2 Login with Google
- Create, update, delete, filter, and share tasks
- Real-time updates using WebSockets
- Responsive design (Mobile + Desktop)
- Error boundaries, loading states, and toasts

## 🧠 Assumptions

- For login, we implemented only Google Login
- Task sharing is via registered user email (not public)
- Real-time is via WebSocket polling fallback (not Firebase)
- MongoDB Atlas is used as the database

## 📐 Architecture

![App Architecture](./architecture.png)

## 🔧 Tech Stack

| Layer      | Tech                       |
|------------|----------------------------|
| Frontend   | React (Vite), Axios        |
| Backend    | Node.js, Express.js        |
| Auth       | Firebase Authentication    |
| Database   | MongoDB Atlas              |
| Real-Time  | WebSockets (socket.io)     |
| Hosting    | Frontend - Vercel          |
|            | Backend - Render           |

## 🛠️ Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/YourUsername/todo-app-hackathon.git
cd todo-app-hackathon
