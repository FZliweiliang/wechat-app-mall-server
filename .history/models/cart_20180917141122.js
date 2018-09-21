var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var CartSchema = new Schema({
    openid: String,         //图片地址
    effective: Array,       //有效期
})

var Cart = mongoose.model('Cart', CartSchema)
Promise.promisifyAll(Cart)
Promise.promisifyAll(Cart.prototype)

module.exports = Cart
