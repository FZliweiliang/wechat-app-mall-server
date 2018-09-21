const moment = require('moment')
const mongoose = require('../mongoose')
const Category = mongoose.model('Category')
const Article = mongoose.model('Article')
const User = mongoose.model('User')
const general = require('./general')
const Coupon = mongoose.model('Coupon')

const { item, modify, deletes, recover } = general

/**
 * 上传banner图片
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.uploadBanner = (req,res) => {
     //生成multiparty对象，并配置上传目标路径
     var form = new multiparty.Form({uploadDir: '../file/banner'});

    console.log(req.files)
}

/**
 * 添加分类
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.addClass = (req, res) => {
    const { cate_name, cate_order } = req.body
    if (!cate_name || !cate_order) {
        res.json({
            code: -200,
            message: '请填写分类名称和排序'
        })
    } else {
        return Category.createAsync({
            cate_name,
            cate_order,
            creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            is_delete: 0,
            timestamp: moment().format('X')
        }).then(result => {
            res.json({
                code: 200,
                message: '添加成功',
                data: result._id
            })
        })
    }
}

/**
 * 添加商品
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.addItem = (req, res) => {
    const { 
      category,
      content, 
      title,
      img,
      spec,
      price,
      num,
      is_hot
    } = req.body
    
    // const html = marked(content)
    const arr_category = category.split('|')
    const data = {
        title,
        img,
        spec,
        price,
        num,
        category:arr_category[0],
        category_name:arr_category[1],
        content,
        html:content,
        visit: 0,
        like: 0,
        comment_count: 0,
        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_delete: 0,
        is_hot,
        timestamp: moment().format('X')
    }
    Article.createAsync(data)
    .then(result => {
        return Category.updateAsync({ _id: arr_category[0] }, { $inc: { cate_num: 1 } }).then(() => {
            return res.json({
                code: 200,
                message: '发布成功',
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
 * 删除分类
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.delClass = (req, res) => {
    deletes(req, res, Category)
}

/**
 * 删除商品
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.delItem = (req, res) => {
    const _id = req.query.id
    Article.updateAsync({ _id }, { is_delete: 1 })
        .then(() => {
            return Category.updateAsync({ _id }, { $inc: { cate_num: -1 } }).then(result => {
                res.json({
                    code: 200,
                    message: '更新成功',
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
 * 删除用户
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.delUser = (req, res) => {
    const _id = req.query.id
    User.removeAsync({_id})
    .then((result) => {
        res.json({
            code: -200,
            message: '删除成功',
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
 * 添加优惠券
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.addCoupon = (req,res) => {
  
    const {money,name,effective,category,category_name,condition } = req.body

    let data = {
        money,
        name,
        effective,
        category,
        category_name,
        condition,
        state:1
    }
    Coupon.createAsync(data)
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
}

/**
 * 全部优惠券列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.couponList = (req,res) => {
    Coupon.find()
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