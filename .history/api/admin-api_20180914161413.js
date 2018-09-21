const moment = require('moment')
const mongoose = require('../mongoose')
const Category = mongoose.model('Category')
const Article = mongoose.model('Article')
const User = mongoose.model('User')
const Coupon = mongoose.model('Coupon')
const Banner = mongoose.model('Banner')
const general = require('./general')
const multiparty = require('multiparty');

const { item, modify, deletes, recover } = general

/**
 * 上传banner图片
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.uploadBanner = (req,res) => {
    
    const { img } = req.body

    // let data = {
    //     img_url: String,        //图片地址
    //     href: String,           //跳转地址
    //     name: String,           //名称
    //     is_hide: Boolean,       //是否显示
    //     effective: Array,       //有效期
    // }

     //生成multiparty对象，并配置上传目标路径
    const form = new multiparty.Form({encoding:'utf-8',uploadDir:'../file/banner'});
    console.log(req.files)

    // Errors may be emitted
// Note that if you are listening to 'part' events, the same error may be
// emitted from the `form` and the `part`.
form.on('error', function(err) {
    console.log('Error parsing form: ' + err.stack);
  });
  
  // Parts are emitted when parsing the form
  form.on('part', function(part) {
    // You *must* act on the part by reading it
    // NOTE: if you want to ignore it, just call "part.resume()"
  
    if (!part.filename) {
      // filename is not defined when this is a field and not a file
      console.log('got field named ' + part.name);
      // ignore field's content
      part.resume();
    }
  
    if (part.filename) {
      // filename is defined when this is a file
      console.log('got file named ' + part.name);
      // ignore file's content here
      part.resume();
    }
  
    part.on('error', function(err) {
      // decide what to do
    });
  });
  
  // Close emitted after form parsed
  form.on('close', function() {
    console.log('Upload completed!');
    res.setHeader('text/plain');
    res.end('Received ' + count + ' files');
  });
  
  // Parse req
  form.parse(req);
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