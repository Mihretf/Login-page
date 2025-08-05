const express = require('express');
const connectDB = require('./src/config/database');
const productRoutes = require('./src/routes/product.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', productRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Database connection failed:', error.message);
});