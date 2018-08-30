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