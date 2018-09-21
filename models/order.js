var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var OrderSchema = new Schema({
    openid: String,         //唯一标识
    address: Object,        //订单地址
    state: Number,          //订单状态 1待付款 2待发货 3已发货 4已完成 5已取消 6已退款
    goods: Array,           //商品
    coupon: String,         //优惠券
    invoice: Object,         //发票
    costPrice: Number,       //原价
    totalPrice: Number,      //总价
    freight: Number,         //运费
    creat_date:String,       //创建时间
    update_date:String,      //更新时间
})

var Order = mongoose.model('Order', OrderSchema)
Promise.promisifyAll(Order)
Promise.promisifyAll(Order.prototype)

module.exports = Order
