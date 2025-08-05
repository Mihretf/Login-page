const productService = require('../services/product.service');

class ProductController {
  async createProduct(req, res) {
    try {
      const { name, description, price, inStock } = req.body;
      if (!name || !description || price === undefined || inStock === undefined) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
      const product = await productService.createProduct({ name, description, price, inStock });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: 'Invalid product ID.' });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, inStock } = req.body;
      if (!name || !description || price === undefined || inStock === undefined) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
      const updated = await productService.updateProduct(id, { name, description, price, inStock });
      if (!updated) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ message: 'Invalid product ID.' });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deleted = await productService.deleteProduct(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid product ID.' });
    }
  }
}

module.exports = new ProductController();