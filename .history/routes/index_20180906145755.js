let express = require('express')
let router = express.Router()
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
let intercept = require('../routes/intercept')

let homeApi = require('../api/home-api.js')
let adminApi = require('../api/admin-api.js')
// var publicApi = require('../api/public-api.js')
// var userApi = require('../api/user-api.js')

router.get('/v1/home/bannerList',homeApi.getBannerList) //获取轮播图

router.get('/v1/home/getHotList',homeApi.getHotList) //获取推荐列表

router.get('/v1/home/getList',homeApi.getList) //获取列表

router.post('/v1/admin/addItem',intercept.admin,multipartMiddleware,adminApi.addItem) //添加商品

router.post('/v1/admin/addClass',intercept.admin,adminApi.addClass) //添加分类

router.get('/v1/admin/getClassList',intercept.admin,adminApi.getClassList) //获取推荐列表

// router.post('/v1/user/insert',userApi.insert) //注册

// router.post('/v1/user/login',userApi.login) //登录


router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到该接口'
    })
})

module.exports = router