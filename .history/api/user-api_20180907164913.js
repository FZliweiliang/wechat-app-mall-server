const moment = require('moment')
const mongoose = require('../mongoose')
const marked = require('marked')
const request = require('request');
const config = require('../config')

/**
 * 微信根据code回去用户openId
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getWxUser = (req, res) => {
  const { code } = req.query
    let urlStr = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + config.AppID + '&secret=' + config.Secret + '&js_code=' + code + '&grant_type=authorization_code';
    request(urlStr, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json({
                code: 200,
                message: '更新成功',
                data: JSON.parse(body)
            })
        }else{
            res.json({
                code: -200,
                data: error
            })
        }
    })
}

