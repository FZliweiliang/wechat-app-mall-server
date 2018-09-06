var moment = require('moment')
var mongoose = require('../mongoose')
var Like = mongoose.model('Like')
const general = require('./general')
var Article = mongoose.model('Article')
const list = general.list
const item = general.item
const marked = require('marked')

/**
 * 前台获得banner图片
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getBannerList = (req, res) => {
	var list=[{'img':'https://wx.yogalt.com/file/images/banner.jpg'},{'img':'https://wx.yogalt.com/file/images/banner2.jpg'}]
    res.send(list)
}
/**
 * 前台获得推荐列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getList = (req, res) => {
    var list=[{ //商品列表
        id: 2,
        img:'https://wx.yogalt.com/file/images/img1.jpeg',
        name: "榴恋草莓蛋糕-2磅188元/138元/4磅298元（深圳）",
        spec:"2磅，+19.9元得水果（中盒）…",
        price:999.00,
        num:2,
        select: false,
      },
      {
        id: 3,
        img: 'https://wx.yogalt.com/file/images/img1.jpeg',
        name: "榴恋草莓蛋糕-2磅188元/138元/4磅298元（深圳）",
        spec: "2磅，+19.9元得水果（中盒）…",
        price: 999.01,
        num: 1,
        select: false
      },
      {
        id: 4,
        img: 'https://wx.yogalt.com/file/images/img1.jpeg',
        name: "榴恋草莓蛋糕-2磅188元/138元/4磅298元（深圳）",
        spec: "2磅，+19.9元得水果（中盒）…",
        price: 999.02,
        num: 1,
        select: false
      },
      {
        id: 5,
        img: 'https://wx.yogalt.com/file/images/img1.jpeg',
        name: "榴恋草莓蛋糕-2磅188元/138元/4磅298元（深圳）",
        spec: "2磅，+19.9元得水果（中盒）…",
        price: 999.03,
        num: 1,
        select: false
      },
      {
        id: 6,
        img: 'https://wx.yogalt.com/file/images/img1.jpeg',
        name: "榴恋草莓蛋糕-2磅188元/138元/4磅298元（深圳）",
        spec: "2磅，+19.9元得水果（中盒）…",
        price: 999.04,
        num: 1,
        select: false
      }
    ]
    res.send(list)

}

/**
 * 前台获得推荐列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.setList = (req, res) => {
  var list=[{ //商品列表
      id: 2,
      img:'https://wx.yogalt.com/file/images/img1.jpeg',
      name: "榴恋草莓蛋糕-2磅188元/138元/4磅298元（深圳）",
      spec:"2磅，+19.9元得水果（中盒）…",
      price:999.00,
      num:2,
      select: false,
    },
    {
      id: 3,
      img: 'https://wx.yogalt.com/file/images/img1.jpeg',
      name: "榴恋草莓蛋糕-2磅188元/138元/4磅298元（深圳）",
      spec: "2磅，+19.9元得水果（中盒）…",
      price: 999.01,
      num: 1,
      select: false
    },
    {
      id: 4,
      img: 'https://wx.yogalt.com/file/images/img1.jpeg',
      name: "榴恋草莓蛋糕-2磅188元/138元/4磅298元（深圳）",
      spec: "2磅，+19.9元得水果（中盒）…",
      price: 999.02,
      num: 1,
      select: false
    },
    {
      id: 5,
      img: 'https://wx.yogalt.com/file/images/img1.jpeg',
      name: "榴恋草莓蛋糕-2磅188元/138元/4磅298元（深圳）",
      spec: "2磅，+19.9元得水果（中盒）…",
      price: 999.03,
      num: 1,
      select: false
    },
    {
      id: 6,
      img: 'https://wx.yogalt.com/file/images/img1.jpeg',
      name: "榴恋草莓蛋糕-2磅188元/138元/4磅298元（深圳）",
      spec: "2磅，+19.9元得水果（中盒）…",
      price: 999.04,
      num: 1,
      select: false
    }
  ]
  res.send(list)

    const { 
      category, 
      content, 
      title,
      img,
      spec,
      price,
      num
    } = req.body
    
    const html = marked(content)
    const arr_category = category.split('|')
    const data = {
        title,
        img,
        spec,
        price,
        num,
        category: arr_category[0],
        category_name: arr_category[1],
        content,
        html,
        visit: 0,
        like: 0,
        comment_count: 0,
        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_delete: 0,
        timestamp: moment().format('X')
    }
    Article.createAsync(data)
      .then(result => {
          return Category.updateAsync({ _id: arr_category[0] }, { $inc: { cate_num: 1 } }).then(() => {
              return res.json({
                  code: 200,
                  message: '发布成功',
                  data: result
              })
          })
      })
      .catch(err => {
          res.json({
              code: -200,
              message: err.toString()
          })
      })
}