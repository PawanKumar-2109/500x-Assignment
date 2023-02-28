const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id : {
        type : String,
        required: true,
        unique: true
    },
    role : {
        type : String,
        required : true
    },
    password : {
        type: String,
        required: true
    }
})

var product = new mongoose.Schema({
    product_name : {
        type : String,
        required : true,
        unique : true
    },
    price : {
        type : Number,
        required : true
    },
    seller : {
        type : String,
        required : true
    }
})

const Userdb = mongoose.model('userdb', schema);
const Product = mongoose.model('productdb',product);

module.exports = {Userdb,Product};