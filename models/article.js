var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var ArticleSchema = new Schema({
    title: String,
    content: String,
    html: String,
    category: String,
    category_name: String,
    visit: Number,
    like: Number,
    comment_count: Number,
    creat_date: String,
    update_date: String,
    is_delete: Number,
    timestamp: Number
})

var Article = mongoose.model('Article', ArticleSchema)
Promise.promisifyAll(Article)
Promise.promisifyAll(Article.prototype)

module.exports = Article
