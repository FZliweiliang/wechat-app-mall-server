var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var UserSchema = new Schema({
    openid: String,     //唯一标识
    mobile: Number,     //手机号
    update_date:String, //更新时间
    creat_date:String,  //创建时间
    address:Object,     //地址
    coupon:Array        //优惠券
})

var User = mongoose.model('User', UserSchema)
Promise.promisifyAll(User)
Promise.promisifyAll(User.prototype)

module.exports = User
