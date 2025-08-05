const express = require('express');
const mongoose = require("mongoose");
const connectDB = require('./src/config/database');
const productRoutes = require('./src/routes/product.routes');
const authRoutes = require("./src/routes/auth.routes")
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api', productRoutes);
app.use("/api/auth", authRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Database connection failed:', error.message);
});