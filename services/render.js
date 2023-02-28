const axios = require('axios');
const stripe = require('stripe')('sk_test_51MgAZtSDlqdSkfhn2ipn5RoTRcXJx1fuNkrNxj3koSVeR8UGA9L47uVziWAhrTMOM9wb3Qf9QMJg9BzjPj31mpRh00KnuvXFOm');

exports.homepage = (req,res) => {
    if(req.session.user_id){
        axios.get('http://localhost:3000/api/products')
            .then(function(result){
                res.render('dashboard',{
                    product:result.data
                })
            })
            .catch(err=>{
                res.send(err);
            })
    }
    else {
        res.render('homepage');
    }
}

exports.login = (req,res) => {
    axios.post('http://localhost:3000/api/login',req.body)
        .then(function(result){
            if(result.data.length==0){
                res.render('error',{
                    message : "Invalid Credentials"
                })
            }else{
                req.session.user_id = result.data[0].user_id;
                req.session.role = result.data[0].role;
                res.redirect('/');
            }
        })
}

exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/');
}

exports.signup = (req,res) => {
    axios.post('http://localhost:3000/api/signup',req.body)
        .then(function(result){
            if(!result.data.status){
                res.render('error',{
                    message : "User_Id Already Taken"
                })
            }else{
                res.redirect('/');
            }
        }).catch(err=>{
            res.send(err);
        })
}

exports.add_product = (req,res) => {
    if(req.session.role!='SELLER'){
        res.render('error',{
            message : "You are not Authorised to add Product"
        })
    }else{
        req.body.seller = req.session.user_id;
        axios.post('http://localhost:3000/api/add_product',req.body)
            .then(function(result){
                res.redirect('/');
            }).catch(err=>{
                res.send(err);
            })
    }
}

exports.form_product = (req,res) => {
    if(req.session.role!='SELLER'){
        console.log(req.session.role);
        res.render('error',{
            message : "You are not Authorised to add Product"
        })
    }else{
        res.render('add_product');
    }
}

exports.buy = (req,res) => {
    product = {
        product_name : req.query.product_name,
        price : req.query.price
    };
    res.render('payment',{product:product});
}

exports.charge = async (req,res) => {
    const amount = req.query.price;
    const name = req.body.name;
    const email = req.body.email;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'inr',
        payment_method_types: ['card'],
        metadata: {
            name: name,
            email: email,
        },
    });
    res.render('error',{
        message : "Order Placed Successfully"
    })
}