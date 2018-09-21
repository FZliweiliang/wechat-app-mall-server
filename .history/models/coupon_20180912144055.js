var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var CouponSchema = new Schema({
    name: String,           //优惠价名称
    money: Number,          //金额
    effective: Array,       //有效期
    category:String,        //类别
    category_name:String,   //类别名称
    condition:Number,       //条件
    state: Number,          //状态  1:可用  2:已使用  3:已过期
})

var Coupon = mongoose.model('Coupon', CouponSchema)
Promise.promisifyAll(Coupon)
Promise.promisifyAll(Coupon.prototype)

module.exports = Coupon
