const express = require('express')
const router = express.Router()
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart({})
const intercept = require('../routes/intercept')

const homeApi = require('../api/home-api.js')
const adminApi = require('../api/admin-api.js')
const publicApi = require('../api/public-api.js')
const userApi = require('../api/user-api.js')
const orderApi = require('../api/order-api.js')

// ------- 管理 -------
router.get('/v1/admin/delUser', intercept.admin,adminApi.delUser) //删除用户

router.get('/v1/admin/delItem', intercept.admin,adminApi.delItem) //删除商品

router.post('/v1/admin/addItem',intercept.admin,multipartMiddleware,adminApi.addItem) //添加商品

router.post('/v1/admin/addClass',intercept.admin,adminApi.addClass) //添加分类

router.get('/v1/admin/delClass',intercept.admin,adminApi.delClass) //删除分类

router.post('/v1/admin/addCoupon',intercept.admin,adminApi.addCoupon) //添加优惠券

router.get('/v1/admin/couponList',intercept.admin,adminApi.couponList) //所有优惠券

router.post('/v1/admin/uploadBanner',intercept.admin,adminApi.uploadBanner) //上传banner

// ------- 首页 -------
router.get('/v1/home/bannerList',homeApi.getBannerList) //获取banner

router.get('/v1/home/getHotList',homeApi.getHotList) //获取推荐列表

router.get('/v1/home/getList',homeApi.getList) //获取列表

router.get('/v1/home/getItem',homeApi.getItem) //获取详情

// ------- 订单 -------
router.post('/v1/order/set',intercept.user,orderApi.setOrder) //创建订单

router.post('/v1/order/get',intercept.user,orderApi.getOrder) //获取订单详情

router.get('/v1/order/list',intercept.user,orderApi.getList) //订单列表

router.post('/v1/order/update',intercept.user,orderApi.updateOrder) //更新订单


// ------- 微信 -------
router.get('/v1/wx/getUser',userApi.getWxUser) //获取微信用户信息

// ------- 用户 -------
router.post('/v1/user/bindMobile',intercept.user,userApi.bindMobile) //绑定手机号

router.post('/v1/user/addCity',intercept.user,userApi.addCity) //添加地址

router.post('/v1/user/editCity',intercept.user,userApi.editCity) //更新地址

router.post('/v1/user/defaultCity',intercept.user,userApi.defaultCity) //设置默认地址

router.get('/v1/user/cityList',intercept.user,userApi.cityList) //地址列表

router.post('/v1/user/getCoupon',intercept.user,userApi.getCoupon) //用户获取优惠券

router.get('/v1/user/couponList',intercept.user,userApi.couponList) //获取拥有的优惠券列表

// ------- 通用 -------
router.get('/v1/public/getClassList',publicApi.getClassList) //获取分类列表

// ------- 购物车 -------
router.post('/v1/order/addCart',intercept.user,orderApi.addCart) //加入购物车

router.get('/v1/order/cartList',intercept.user,orderApi.cartList) //购物车列表

router.post('/v1/order/delIetm',intercept.user,orderApi.cartDel) //购物车删除商品

router.post('/v1/order/editCart',intercept.user,orderApi.editCart) //编辑购物车

router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到该接口'
    })
})

module.exports = router