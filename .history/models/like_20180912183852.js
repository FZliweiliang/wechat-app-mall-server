var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var LikeSchema = new Schema({
    article_id: String,
    user_id: String,
    creat_date: String,
    timestamp: Number,
})

var Like = mongoose.model('Like', LikeSchema)
Promise.promisifyAll(Like)
Promise.promisifyAll(Like.prototype)

module.exports = Like
