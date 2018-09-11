const moment = require('moment')
const mongoose = require('../mongoose')
const marked = require('marked')
const request = require('request');
const config = require('../config')
const User = mongoose.model('User')

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
    request(urlStr, (error, response, body)=>{
        if (!error && response.statusCode == 200) {
            let json = null
                console.log(body)
                User.findOneAsync({ //查询数据库是否有该用户
                    openid:body.openid,
                })
                .then(result => {
                    console.log(result)
                    if (result) {
                        // User.createAsync({
                        //     openid:body.openid,
                        //     creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                        //     update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                        // }).then(result => {
                        //     res.json({
                        //         code: 200,
                        //         message: '获取成功',
                        //         data: JSON.parse(body)
                        //     })
                        // })
                    } else {
                        User.createAsync({
                            openid:body.openid,
                            creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                            update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                        }).then(result => {
                            json = {
                                code: 200,
                                message: '获取成功',
                                data: JSON.parse(body)
                            }
                        })
                    }
                    res.json(json)
                })
                .catch(err => {
                    console.log(err)
                    res.json({
                        code: -200,
                        message: err.toString(),
                        data: JSON.parse(body)
                    })
                })

        }else{
            res.json({
                code: -200,
                data: error
            })
        }
    })
}
