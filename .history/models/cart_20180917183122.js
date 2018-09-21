var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var CartSchema = new Schema({
    openid: String,         //用户id
    goodsList: Array,       //商品列表
})

var Cart = mongoose.model('Cart', CartSchema)
Promise.promisifyAll(Cart)
Promise.promisifyAll(Cart.prototype)

module.exports = Cart
