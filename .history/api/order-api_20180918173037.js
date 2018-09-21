const moment = require('moment')
const mongoose = require('../mongoose')
const Cart = mongoose.model('Cart')
const Article = mongoose.model('Article')
/**
 * 加入购物车
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.addCart = (req,res) => {
    const {
        openid,
        id,
        num,
        spec,
        title,
        img,
        price} = req.body

    Cart.find({openid},{'goodsList':{$elemMatch:{"id":id}}})
    .then(result=>{
        console.log(result[0].goodsList)
        console.log(result[0].goodsList[0].num)
        if(result[0].goodsList.length > 0){ //同样的商品
            Cart.updateAsync({openid},{$set:{"goodsList.$.num":result[0].goodsList[0].num+num}})
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
        }else{
            Cart.updateAsync({openid},{'$push':{"goodsList":{id,num,spec,title,img,price}}})
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
    const {openid} = req.query
    Cart.find({openid})
    .then(result=>{
        res.json({
            code: 200,
            data: result[0].goodsList
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
 * 编辑购物车
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.editCart = (req,res) => {
    const {openid,list} = req.body
    Cart.updateAsync({openid},{"goodsList":list})
    .then(result=>{
        res.json({
            code: 200,
            message: '编辑完成',
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
    const {openid,arr} = req.body
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