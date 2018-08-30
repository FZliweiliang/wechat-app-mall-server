var express = require('express')
var router = express.Router()

var homeApi = require('../api/home-api.js')
// var publicApi = require('../api/public-api.js')
// var userApi = require('../api/user-api.js')

router.get('/v1/home/bannerList',homeApi.getBannerList) //获取轮播图

// router.post('/v1/user/insert',userApi.insert) //注册

// router.post('/v1/user/login',userApi.login) //登录


router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到该页面'
    })
})

module.exports = router