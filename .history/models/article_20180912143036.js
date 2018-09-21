var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var ArticleSchema = new Schema({
    title: String,          //名称
    img: String,            //图片
    spec:String,            //规格
    price:String,           //价格
    num:Number,             //数量
    content: String,        //内容
    html: String,           //html
    category: String,       //分类id
    category_name: String,  //分类名称
    visit: Number,          //购买次数
    like: Number,           //收藏
    comment_count: Number,  //评价次数
    creat_date: String,     //创建日期
    update_date: String,    //更新日期
    is_delete: Number,      //是否显示
    timestamp: Number,      //时间戳
    is_hot:Boolean          //是否推荐
})

var Article = mongoose.model('Article', ArticleSchema)
Promise.promisifyAll(Article)
Promise.promisifyAll(Article.prototype)

module.exports = Article
