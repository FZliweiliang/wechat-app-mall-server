require('../utils').creatSecret()
const secret = require('./secret.js')

// MD5 加密前缀, 如用户的密码是 123456, 存到数据库将会变成 md5('!@#$%(*&^)' + '123456')
exports.md5Pre = "!@#$%(*&^)"
exports.secretServer = secret.secretServer
exports.secretClient = secret.secretServer

exports.AppID = "wx990a52ed22a14656"
exports.Secret = "560cc037c1a25d8bf016d29fe7a0b249"
