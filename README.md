# E-commerce REST API

A simple RESTful API for managing products in an e-commerce system, built with Node.js, Express, and MongoDB.

## Features
- CRUD operations for products (Create, Read, Update, Delete)
- MongoDB database integration using Mongoose
- Proper error handling and status codes
- Modular folder structure for scalability

## Folder Structure
```
ecommerce_project/
├── index.js
├── package.json
├── README.md
└── src/
    ├── config/
    │   └── database.js
    ├── controllers/
    │   └── product.controller.js
    ├── models/
    │   └── product.schema.js
    ├── repository/
    │   └── product.repository.js
    ├── routes/
    │   └── product.routes.js
    └── services/
        └── product.service.js
```

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running locally

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd ecommerce_project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB (if not running):
   ```bash
   mongod
   ```
4. Start the server:
   ```bash
   node index.js
   # or, for development
   npx nodemon index.js
   ```

## API Endpoints

### Create a Product
- **POST** `/api/products`
- **Body:**
  ```json
  {
    "name": "Smart Fitness Watch",
    "description": "Waterproof fitness tracker with heart rate monitor and GPS.",
    "price": 89.99,
    "inStock": true
  }
  ```

### Get All Products
- **GET** `/api/products`

### Get Product by ID
- **GET** `/api/products/:id`

### Update a Product
- **PUT** `/api/products/:id`
- **Body:**
  ```json
  {
    "name": "Updated Name",
    "description": "Updated description.",
    "price": 99.99,
    "inStock": false
  }
  ```

### Delete a Product
- **DELETE** `/api/products/:id`

## Error Handling
- Returns appropriate status codes and messages for missing fields, invalid IDs, and not found cases.

## Demo
[Watch the API Demo Here](https://www.awesomescreenshot.com/video/42441228?key=ace74ee4f1c9e9da14c6ea622a745be9)

---

**Feel free to fork, clone, and use this project as a starting point for your own e-commerce backend!**
