'use strict'

const mongoose = require('mongoose')
const Order = mongoose.model('Order')

exports.get = async () => {
    const res = await Order.find({}, 'number customer createDate status items');
    return res;
}
exports.create = async (data) => {
    var order = new Customer(data);
    await order.save();
}