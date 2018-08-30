var mongoose = require('mongoose')
mongoose.connect('mongodb://admin:liangliang@172.18.192.98:27017/yogapu', { useNewUrlParser: true }) //服务器
mongoose.Promise = global.Promise
module.exports = mongoose
