var model = require('../model/model');
var Userdb = model.Userdb;
var Product = model.Product;

exports.create = (req,res)=>{
    const user = new Userdb({
        user_id : req.body.user_id,
        role : req.body.role,
        password : req.body.password
    })
    user
        .save(user)
        .then(data =>{
            res.send({
                status : true
            });
        })
        .catch(err => {
            res.send(err);
        });
}

exports.login = (req,res)=>{
    Userdb.find({user_id:req.body.user_id,password:req.body.password})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.send(err);
        })
}

exports.product_create = (req,res)=>{
    const prod = new Product({
        product_name : req.body.product_name,
        price : req.body.price,
        seller : req.body.seller
    })
    prod
        .save(prod)
        .then(data =>{
            res.send("Product Added");
        })
        .catch(err => {
            res.send(err);
        });
}

exports.get_products = (req,res) => {
    Product.find()
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.send(err);
        })
}