var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var CartSchema = new Schema({
    img_url: String,        //图片地址
    href: String,           //跳转地址
    name: String,           //名称
    is_show: Boolean,       //是否显示
    effective: Array,       //有效期
})

var Cart = mongoose.model('Cart', CartSchema)
Promise.promisifyAll(Cart)
Promise.promisifyAll(Cart.prototype)

module.exports = Cart
