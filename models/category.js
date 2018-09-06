const mongoose = require('../mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')

const CategorySchema = new Schema({
    cate_name: String,
    cate_order: String,
    cate_num: Number,
    creat_date: String,
    update_date: String,
    is_delete: Number,
    timestamp: Number
})

const Category = mongoose.model('Category', CategorySchema)
Promise.promisifyAll(Category)
Promise.promisifyAll(Category.prototype)

module.exports = Category