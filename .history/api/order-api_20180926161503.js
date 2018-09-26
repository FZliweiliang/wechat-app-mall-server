const moment = require('moment')
const mongoose = require('../mongoose')
const Cart = mongoose.model('Cart')
const Article = mongoose.model('Article')
const Order = mongoose.model('Order')
const { removeProperty } = require('../utils')
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
        price,
        category
        } = req.body

    Cart.find({openid},{'goodsList':{$elemMatch:{"id":id}}})
    .then(result=>{
        if(result[0].goodsList.length > 0){ //同样的商品
            Cart.updateAsync({openid,"goodsList.id":id},{$set:{"goodsList.$.num":result[0].goodsList[0].num+num}})
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
            Cart.updateAsync({openid},{'$push':{"goodsList":{id,num,spec,title,img,price,category}}})
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


/**
 * 创建订单
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.setOrder = (req,res) => {

    const {openid,goods} = req.body

    let data = {
        openid,
        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        state:1,
        goods,
        costPrice:0,
        totalPrice:0,
        freight:0,
    }

    let goodsId = []

    let totalPrice = 0
    let costPrice = 0
    
    goods.map((v,k)=>{
        goodsId.push(v.id)
    })

    Article.find({_id:{$in:goodsId}}).then(result=>{
        result.map((v,k)=>{ //查询真实价格 防止篡改
            goods.map((n,m)=>{
                if(v._id == n.id){
                    totalPrice += v.price*n.num
                    costPrice = totalPrice 
                }
            })
        })

        if(totalPrice > 98){ //满99包邮
            data.freight = 0
        }else{
            data.freight = 8
            totalPrice + data.freight
        }

        data.totalPrice = totalPrice.toFixed(2)
        data.costPrice = costPrice.toFixed(2)

        Order.createAsync(data).then(result=>{
            res.json({
                code: 200,
                message: '订单创建成功',
                data: result
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

/**
 * 获取订单详情
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getOrder = (req,res) => {
    const {id} = req.body
    let _id = id
    Order.find({_id})
    .then(result=>{
        res.json({
            code: 200,
            data: result[0]
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
 * 提交订单
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.submitOrder = (req,res) => {

    const {id} = req.body
    
    let data = {
        state:2,
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    Cart.updateAsync({_id:id},{data})
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
 * 更新订单
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.updateOrder = (req,res) => {

    const {id,address,coupon,invoice} = req.body
    
    let data = {
        address,
        coupon,
        invoice,
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    removeProperty(data)

    Cart.updateAsync({_id:id},{data})
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
 * 我的订单列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getList = (req,res) => {
    const {openid,state} = req.query
    Order.find({openid,state})
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
