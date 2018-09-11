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
                let data = JSON.parse(body)
                console.log(data.openid)
                User.findOneAsync({ //查询数据库是否有该用户
                    openid:data.openid,
                })
                .then(result => {
                    console.log(result,111111)
                    // if (result) {
                    //     json = {
                    //         code: 200,
                    //         message: '获取成功',
                    //         data: {
                    //             openid:data.openid,
                    //             session_key:data.session_key,
                    //             mobile:result.mobile,
                    //             address:result.address,
                    //             coupon:result.coupon,
                    //         }
                    //     }
                    // } else {
                        User.createAsync({
                            openid:data.openid,
                            creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                            update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                        }).then(result => {
                            json = {
                                code: 200,
                                message: '获取成功',
                                data: {
                                    openid:data.openid,
                                    session_key:data.session_key,
                                    mobile:result.mobile,
                                    address:result.address,
                                    coupon:result.coupon,
                                }
                            }
                        })
                    // }
                    res.json(json)
                })
                .catch(err => {
                    res.json({
                        code: -200,
                        message: err.toString(),
                        data
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
/**
 * 绑定手机号
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.bindMobile = (req,res) => {
    const {code,openid,mobile} = req.body
    let data = {
        mobile,
        update_date: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    User.find((err,data)=>{
        console.log(data)
    })

    User.updateAsync({openid}, data, { new: true })
        .then(result => {
            console.log(result)
            res.json({
                code: 200,
                message: '绑定成功',
                data: result
            })
        })
        .catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })

}
