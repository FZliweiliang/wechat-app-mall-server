var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var CouponSchema = new Schema({
    openid: String,
    city: Array,
    name: String,
    mobile: Number,
    detailed: String
})

var Coupon = mongoose.model('Coupon', CouponSchema)
Promise.promisifyAll(Coupon)
Promise.promisifyAll(Coupon.prototype)

module.exports = Coupon
