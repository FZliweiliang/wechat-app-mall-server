var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    type: Number,
    is_prove: Number,
    userId:Number,
    update_date:String,
    creat_date:String
})

var User = mongoose.model('User', UserSchema)
Promise.promisifyAll(User)
Promise.promisifyAll(User.prototype)

module.exports = User
