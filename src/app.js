'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conecta ao banco
mongoose.connect('mongodb+srv://balta:balta@mongodb.nn34c.mongodb.net/ndstr?retryWrites=true&w=majority');

// Carrega os models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
module.exports = app;