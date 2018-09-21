const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { scheduleCoupon } = require('./utils')

// body 解析中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// cookie 解析中间件
app.use(cookieParser())

// 引入 mongoose 相关模型
require('./models/article')
require('./models/category')
require('./models/cart')
require('./models/address')
require('./models/coupon')
require('./models/user')
require('./models/banner')
require('./models/order')

//图片文件
app.get('/file/images/*', function (req, res) {
    res.sendFile( __dirname + "/" + req.url )
    console.log("Request for " + req.url + " received.")
})

//图标文件
app.get('/file/icon/*', function (req, res) {
    res.sendFile( __dirname + "/" + req.url )
    console.log("Request for " + req.url + " received.")
})

//轮播图文件
app.get('/file/banner/*', function (req, res) {
    res.sendFile( __dirname + "/" + req.url )
    console.log("Request for " + req.url + " received.")
})




// 引入 api 路由
const routes = require('./routes/index')
// api 路由
app.use('/api', routes)

//配置服务端口
const server = app.listen(8082, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log(host, port);
})

scheduleCoupon() //定时修改优惠券状态任务
