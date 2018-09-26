const schedule = require('node-schedule')
const moment = require('moment')
const mongoose = require('../mongoose')

exports.scheduleCoupon = ()=>{ //定时修改优惠券状态
    const Coupon = mongoose.model('Coupon')
    schedule.scheduleJob('0 0 0 * * *',()=>{
        Coupon.find()
        .then(result => {
            console.log(result)
            result.map((v,k)=>{
                let end =  moment(v.effective[1],'YYYY-MM-DD').valueOf() //结束时间 1536854400000
                let current = moment(new Date(), 'YYYY-MM-DD').valueOf() //当前时间 1536681600000
                if(end<current){
                    Coupon.updateAsync({_id:v._id},{state:3})
                    .then(result => {
                        console.log(result)
                    })
                    .catch(err => {
                        console.log(err.toString())
                    })
                }
            })
        })
        .catch(err => {
            console.log(err.toString())
        })
    });
}

exports.removeProperty = (object)=>{
    for(prop in object){
        if (object[prop]===''||!object[prop]) {
            delete object[prop]
        }
    }
}

