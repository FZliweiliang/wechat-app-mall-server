var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var OrderSchema = new Schema({
    address: Object,        //订单地址
    state: Number,          //订单状态 1待付款 2待发货 1已发货 1已完成
    goods: Array,           //商品
    coupon: Object,         //优惠券
    invoice:Object,         //发票
    totalPrice:Number,      //总价
    freight:Number,         //运费
})

var Order = mongoose.model('Order', OrderSchema)
Promise.promisifyAll(Order)
Promise.promisifyAll(Order.prototype)

module.exports = Order
