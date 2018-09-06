const express = require('express')
const router = express.Router()
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const intercept = require('../routes/intercept')

const homeApi = require('../api/home-api.js')
const adminApi = require('../api/admin-api.js')
// const publicApi = require('../api/public-api.js')
// const userApi = require('../api/user-api.js')

router.get('/v1/home/bannerList',homeApi.getBannerList) //获取轮播图

router.get('/v1/home/getHotList',homeApi.getHotList) //获取推荐列表

router.get('/v1/home/getList',homeApi.getList) //获取列表

router.post('/v1/admin/addItem',intercept.admin,multipartMiddleware,adminApi.addItem) //添加商品

router.post('/v1/admin/addClass',intercept.admin,adminApi.addClass) //添加分类

router.get('/v1/admin/getClassList',intercept.admin,adminApi.getClassList) //获取分类列表

// ------- 分类 -------
// 管理时, 获取分类列表
router.post('/v1/admin/addClass',intercept.admin,adminApi.addClass) //添加分类

router.get('/v1/admin/getClassList',intercept.admin,adminApi.getClassList) //获取分类列表

router.get('/v1/admin/delClass',intercept.admin,adminApi.delClass) //删除分类


router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到该接口'
    })
})

module.exports = router