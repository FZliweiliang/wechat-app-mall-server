var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var BannerSchema = new Schema({
    img_url: String,        //图片地址
    href: String,           //跳转地址
    name: String,           //名称
    is_hide: Boolean,       //是否显示
    effective: Array,       //有效期
})

var Banner = mongoose.model('Banner', AddressSchema)
Promise.promisifyAll(Banner)
Promise.promisifyAll(Address.prototype)

module.exports = Banner
