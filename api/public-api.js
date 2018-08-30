// var svgCaptcha = require('svg-captcha');

// exports.getCode = (req, res) => {
// 	var codeConfig = {
// 		size: 5,// 验证码长度
// 		ignoreChars: '0o1i', // 验证码字符中排除 0o1i
// 		noise: 2, // 干扰线条的数量
// 		height: 44
// 	}
// 	var captcha = svgCaptcha.create(codeConfig);
// 	req.session.captcha = captcha.text.toLowerCase();
// 	var codeData = {
// 		img:captcha.data
// 	}
// 	res.send(codeData);
// }

// exports.setCode = (req, res) => {
// 	// res.send({
// 	// 		code:200,
// 	// 		is:true
// 	// 	})
// 	console.log(req.session.captcha)
// 	console.log(req.body.text.toLowerCase())
// 	if(req.body&&req.session.captcha == req.body.text.toLowerCase()){
// 		res.send({
// 			code:200,
// 			is:true
// 		})
// 	}else{
// 		res.send({
// 			code:201,
// 			message: '用户名或者密码错误',
// 			is:false
// 		})
// 	}
// }
