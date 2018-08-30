var moment = require('moment')
var mongoose = require('../mongoose')
var Like = mongoose.model('Like')
const general = require('./general')
var Article = mongoose.model('Article')
const list = general.list
const item = general.item

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

exports.getHotList = (req, res) => {
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