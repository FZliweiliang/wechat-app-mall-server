var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var AddressSchema = new Schema({
    openid: String,     //唯一标识
    city: Array,        //城市区域
    name: String,       //收货人
    mobile: Number,     //手机号
    detailed: String    //详细地址
})

var Address = mongoose.model('Address', AddressSchema)
Promise.promisifyAll(Address)
Promise.promisifyAll(Address.prototype)

module.exports = Address
