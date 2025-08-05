const mongoose = require('mongoose');
const connectDB= async () => {
    try {
        const connect = await   mongoose.connect("mongodb://127.0.0.1:27017/productdb")
        console.log(`MongoDB Connected: ${connect.connection.host}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

module.exports = connectDB;