const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');


route.get('/',services.homepage);

route.post('/login',services.login);
route.post('/signup',services.signup);
route.get('/logout',services.logout);
route.post('/add_product',services.add_product);
route.get('/add_product',services.form_product);
route.get('/buy',services.buy);
route.post('/charge',services.charge);



route.post('/api/signup',controller.create);
route.post('/api/login',controller.login);
route.get('/api/products',controller.get_products);
route.post('/api/add_product',controller.product_create);

module.exports = route;

