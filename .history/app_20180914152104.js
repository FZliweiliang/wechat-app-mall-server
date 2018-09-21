const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const multiparty = require('connect-multiparty')
const { scheduleCoupon } = require('./utils')

// body 解析中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multiparty({uploadDir: './file/banner'}))
// cookie 解析中间件
app.use(cookieParser())

// 引入 mongoose 相关模型
require('./models/article')
require('./models/category')
require('./models/address')
require('./models/coupon')
require('./models/user')
require('./models/banner')

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
    console.log('Example app listening at http://%s:%s', host, port);

    if (req.url === '/v1/admin/uploadBanner' && req.method === 'POST') {
        // parse a file upload
        var form = new multiparty.Form();
    
        form.parse(req, function(err, fields, files) {
          res.writeHead(200, {'content-type': 'text/plain'});
          res.write('received upload:\n\n');
          res.end(util.inspect({fields: fields, files: files}));
        });
    
        return;
      }
    
      // show a file upload form
      res.writeHead(200, {'content-type': 'text/html'});
      res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="text" name="title"><br>'+
        '<input type="file" name="upload" multiple="multiple"><br>'+
        '<input type="submit" value="Upload">'+
        '</form>'
      );


})

scheduleCoupon() //定时修改优惠券状态任务
