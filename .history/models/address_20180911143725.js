var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var AddressSchema = new Schema({
    openid: String,
    city: Array,
    name: String,
    mobile: Number,
    detailed: String
})

var Address = mongoose.model('Address', AddressSchema)
Promise.promisifyAll(Address)
Promise.promisifyAll(Address.prototype)

module.exports = Address
