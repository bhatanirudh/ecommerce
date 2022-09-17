const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(    // nosql simple schema for user
    {
    name: {
        type: String,  
    },
    price: {
        type: String,
    },
    description: {
        type: String,
    },
    quantity: {
        type: String,
    },
    image: {
        type: String,
    }
});

const Product = mongoose.model('Product',productSchema);  // keeping model name Capital // very important
module.exports = Product;