const Product = require('../models/product.schema');

class ProductRepository {
    async createProduct(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    async getProductById(productId) {
        return await Product.findById(productId);
    }

    async updateProduct(productId, productData) {
        return await Product.findByIdAndUpdate(productId, productData, { new: true });
    }

    async deleteProduct(productId) {
        return await Product.findByIdAndDelete(productId);
    }

    async getAllProducts() {
        return await Product.find({});
    }
}

module.exports = new ProductRepository();