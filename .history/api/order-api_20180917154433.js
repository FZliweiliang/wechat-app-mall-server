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
    const {openid,id,num,spec} = req.body
    Cart.find({openid})
    .then(result=>{
        let data = {
            openid,
            goodsList:[{
                id,
                num,
                spec
            }]
        }
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
        let listId = []
        result[0].goodsList.map((v,k)=>{
            listId.push(v.id)
        })
        const filds =
      'title img spec price num _id'
        Article.find({"_id":{$in:listId}},filds).then(result=>{
            res.json({
                code: 200,
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