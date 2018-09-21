const moment = require('moment')
const mongoose = require('../mongoose')
const Cart = mongoose.model('Cart')

/**
 * 加入购物车
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.addCart = (req,res) => {
    const {openid,id,num,spec} = req.query
    Cart.find({openid})
    .then(result=>{
        console.log(result)
        if(result[0]){
            Cart.updateAsync({openid},{'$push':{"goodsList":{id,num,spec}}})
            .then(result=>{
                res.json({
                    code: 200,
                    message: '加入购物车成功',
                    data: result
                })
            })
            .catch(err => {
                res.json({
                    code: -200,
                    message: err.toString()
                })
            })
        }else{ //首次加入购物车
            let data = {
                openid,
                goodsList:[{
                    id:id,
                    num:num,
                    spec:spec
                }]
            }
            Cart.createAsync(data)
            .then(result=>{
                res.json({
                    code: 200,
                    message: '加入购物车成功',
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
    })
    
}

/**
 * 购物车列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.cartList = (req,res) => {
    const {openid,id,num,spec} = req.query
    
    Cart.find({openid})
    .then(result=>{
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
 * 删除购物车商品
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.cartDel = (req,res) => {
    const {openid,arr} = req.query
    Cart.updateAsync({openid},{'$push':{"goodsList":{id,num,spec}}})
    .then(result=>{
        res.json({
            code: 200,
            message: '加入购物车成功',
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