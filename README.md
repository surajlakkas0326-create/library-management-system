📚 Library Management System

A full-stack Library Management System built using React, Node.js, Express, and MongoDB with JWT authentication and role-based access (Admin / User).

🚀 Features
🔐 Authentication

User Registration & Login

JWT-based authentication

Role handling (Admin / User)

👤 User

View available books

Request books

View request status (Pending / Issued)

Cancel book request (if not issued)

🛠 Admin

Add / Delete books

View all book requests

Issue books to users

View issued date and user details

🗂 Project Folder Structure
Library_Management_System/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   └── BookRequest.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   └── requestRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

▶️ How to Run the Project
1️⃣ Backend
cd backend
npm install
npm start


Backend runs on:
👉 http://localhost:5000

2️⃣ Frontend
cd frontend
npm install
npm run dev


Frontend runs on:
👉 http://localhost:5173

🔑 Default Roles

Admin → Can manage books & issue requests

User → Can request and view books

🛠 Tech Stack

Frontend: React + Vite

Backend: Node.js + Express

Database: MongoDB

Authentication: JWT

✅ Status

✔ Fully working
✔ Authentication implemented
✔ Role-based access
✔ CRUD operations completed
