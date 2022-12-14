'use strict'

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

exports.get = async() => {
    const res = await Customer.find({
        active: true
    }, 'name email');
    return res;
}
exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}