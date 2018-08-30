/**
 * 通用列表
 * @method list
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @param  {[type]} mongoDB [description]
 * @param  {[type]} sort    排序
 * @return {[type]}         [description]
 */
exports.list = (req, res, mongoDB, sort) => {
    sort = sort || '-_id'
    var limit = req.query.limit,
        page = req.query.page
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    var skip = (page - 1) * limit
    Promise.all([
        mongoDB.find().sort(sort).skip(skip).limit(limit).exec(),
        mongoDB.countAsync()
    ]).then(result => {
        var total = result[1]
        var totalPage = Math.ceil(total / limit)
        var json = {
            code: 200,
            data: {
                list: result[0],
                total,
                hasNext: totalPage > page ? 1 : 0,
                hasPrev: page > 1 ? 1 : 0
            }
        }
        res.json(json)
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 通用单个
 * @method item
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @param  {[type]} mongoDB [description]
 * @return {[type]}         [description]
 */
exports.item = (req, res, mongoDB) => {
    var id = req.query.id
    if (!id) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
    mongoDB.findOneAsync({ _id: id }) .then(result => {
        res.json({
            code: 200,
            data: result
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 通用删除
 * @method flagDelete
 * @param  {[type]}   req     [description]
 * @param  {[type]}   res     [description]
 * @param  {[type]}   mongoDB [description]
 * @return {[type]}           [description]
 */
exports.deletes = (req, res, mongoDB) => {
    var id = req.query.id
    mongoDB.updateAsync({ _id: id }, { is_delete: 1 }).then(() => {
        res.json({
            code: 200,
            message: '更新成功',
            data: 'success'
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 通用编辑
 * @method modify
 * @param  {[type]} res     [description]
 * @param  {[type]} mongoDB [description]
 * @param  {[type]} id      [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */
exports.modify = (res, mongoDB, id, data) => {
    mongoDB.findOneAndUpdateAsync({ _id: id }, data, { new: true }).then(result => {
        res.json({
            code: 200,
            message: '更新成功',
            data: result
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 通用编辑
 * @method recover
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @param  {[type]} mongoDB [description]
 * @return {[type]}         [description]
 */
exports.recover = (req, res, mongoDB) => {
    var id = req.query.id
    mongoDB.updateAsync({ _id: id }, { is_delete: 0 }).then(() => {
        res.json({
            code: 200,
            message: '更新成功',
            data: 'success'
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}
