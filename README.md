# MERN Product Dashboard

A full-stack MERN (MongoDB, Express, React, Node.js) web application that allows users to **register**, **log in**, and **manage products** in a dashboard. Authenticated users can add, edit, delete, and view products stored in a MongoDB database.

---

## ✨ Features

- ✅ User Registration & Login (with JWT-based authentication)
- 🔒 Protected Dashboard (access restricted to logged-in users)
- 📦 Product CRUD:
  - Add Product
  - View All Products
  - Edit Product
  - Delete Product
- 🖥️ Responsive and clean UI (React)
- 🛠️ Backend built with Express and MongoDB

---

## 🧰 Tech Stack

### Frontend:
- React
- React Router
- CSS (custom-styled or modularized)

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens) for authentication

---




## Folder Structure
```
├── login-frontend/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── components/ # React pages: Dashboard, Login, Register
│ │ ├── styles/ # CSS files for each page
│ │ └── App.js, index.js ...
├── src/ # Node.js + Express backend
│ ├── config/ # DB configuration
│ ├── controllers/ # Auth & Product controllers
│ ├── models/ # Mongoose schemas
│ ├── repository/ # Optional service layer
│ ├── routes/ # Auth & Product routes
│ ├── services/ # (If used) extra logic or helpers
│ └── index.js # Main backend server entry
```


