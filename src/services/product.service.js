const ProductRepository = require('../repository/product.repository');
class ProductService {
    async createProduct(productData) {
        return await ProductRepository.createProduct(productData);
    }

    async getProductById(productId) {
        return await ProductRepository.getProductById(productId);
    }

    async updateProduct(productId, productData) {
        return await ProductRepository.updateProduct(productId, productData);
    }

    async deleteProduct(productId) {
        return await ProductRepository.deleteProduct(productId);
    }

    async getAllProducts() {
        return await ProductRepository.getAllProducts();
    }
}

module.exports = new ProductService();