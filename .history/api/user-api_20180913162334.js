const moment = require('moment')
const mongoose = require('../mongoose')
const request = require('request');
const config = require('../config')
const User = mongoose.model('User')
const Address = mongoose.model('Address')
const Coupon = mongoose.model('Coupon')

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
                let data = JSON.parse(body)
                User.findOneAsync({ //查询数据库是否有该用户
                    openid:data.openid,
                })
                .then(result => {
                    if (result) {
                        res.json({
                            code: 200,
                            message: '获取成功',
                            data: {
                                openid:data.openid,
                                session_key:data.session_key,
                                mobile:result.mobile,
                                address:result.address,
                                coupon:result.coupon,
                            }
                        })
                    } else {
                        User.createAsync({
                            openid:data.openid,
                            creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                            update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                        }).then(result => {
                            res.json({
                                code: 200,
                                message: '获取成功',
                                data: {
                                    openid:data.openid,
                                    session_key:data.session_key
                                }
                            })
                        })
                    }
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

    User.updateAsync({openid}, data, { new: true })
        .then(result => {
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

/**
 * 添加地址
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.addCity = (req,res) => {
    
    const {city,name,detailed,mobile,openid } = req.body

    let data = {
        mobile,
        detailed,
        name,
        city,
        openid
    }

    Address.find({openid})
        .then(result => {
            if(result.length < 5){
                Address.createAsync(data)
                .then(result => {
                    res.json({
                        code: 200,
                        message: '添加成功',
                        data: result
                    })
                })
                .catch(err => {
                    res.json({
                        code: -200,
                        message: err.toString()
                    })
                }) 
            }else{
                res.json({
                    code: -200,
                    message: '最多只能添加五个地址',
                })
            }
        })
        .catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })
    
}

/**
 * 更新地址
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.editCity = (req,res) => {
    const {city,name,detailed,mobile,openid,id} = req.body
    let data = {
        mobile,
        detailed,
        name,
        city,
        openid
    }
    let _id = id
    Address.updateAsync({_id},data)
        .then(result => {
            res.json({
                code: 200,
                message: '更新成功',
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

/**
 * 地址列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.cityList = (req,res) => {
    const {openid} = req.query

    let data = {
        openid
    }

    Address.find(data)
        .then(result => {
            res.json({
                code: 200,
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

/**
 * 设置默认地址
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.defaultCity = (req,res) => {
    const {id,openid} = req.body
    let _id = id
    Address.find({_id})
        .then(result => {
            if(result){
                let data = {
                    address:{
                        mobile:result[0].mobile,
                        detailed:result[0].detailed,
                        name:result[0].name,
                        city:result[0].city,
                        _id:result[0]._id,
                    },
                    update_date: moment().format('YYYY-MM-DD HH:mm:ss')
                }

                let resultData = result
                User.updateAsync({openid}, data, { new: true })
                .then(result => {
                    res.json({
                        code: 200,
                        message: '设置成功',
                        data: resultData[0]
                    })
                })
                .catch(err => {
                    res.json({
                        code: -200,
                        message: err.toString()
                    })
                })
            }else{
                res.json({
                    code: -200,
                    message: '没有该地址'
                })
            }
            

        })
        .catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })

}

/**
 * 获得优惠券
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getCoupon = (req,res) => {
    const {openid,id} = req.body
    User.find({openid})
    .then(result=>{
        console.log(result)
        result[0].coupon.map((v,k)=>{
            if(v == id){
                return res.json({
                    code: -200,
                    message: '你已领取过此优惠券！'
                })
            }
        })

    // return User.updateAsync({openid},{'$push':{"coupon":id}})
    //     .then(result=>{
    //         res.json({
    //             code: 200,
    //             message: '领取成功',
    //             data: result
    //         })
    //     })
    //     .catch(err => {
    //         res.json({
    //             code: -200,
    //             message: err.toString()
    //         })
    //     })

    
    })
    .catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })

}

/**
 * 获取拥有的优惠券列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.couponList = (req,res) => {
    const {openid} = req.query
    let data = {
        openid
    }
    User.find(data)
        .then(user => {
            Coupon.find()
            .then(result => {
                let list = []
                result.map((v,k)=>{
                    user[0].coupon.map((n,m)=>{
                       if(v._id == n){
                           list.push(v)
                       } 
                    })
                })
                res.json({
                    code: 200,
                    data: list
                })
            })
            .catch(err => {
                res.json({
                    code: -200,
                    message: err.toString()
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

