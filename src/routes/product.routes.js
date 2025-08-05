const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Create a new product
router.post('/products', (req, res) => productController.createProduct(req, res));

// Get all products
router.get('/products', (req, res) => productController.getAllProducts(req, res));

// Get a product by ID
router.get('/products/:id', (req, res) => productController.getProductById(req, res));

// Update a product by ID
router.put('/products/:id', (req, res) => productController.updateProduct(req, res));

// Delete a product by ID
router.delete('/products/:id', (req, res) => productController.deleteProduct(req, res));

module.exports = router;