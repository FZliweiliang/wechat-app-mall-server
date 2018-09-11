var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var UserSchema = new Schema({
    openid: String,
    session_key: String,
    mobile: Number,
    update_date:String,
    creat_date:String,
    address:Object,
    coupon:Array
})

var User = mongoose.model('User', UserSchema)
Promise.promisifyAll(User)
Promise.promisifyAll(User.prototype)

module.exports = User
