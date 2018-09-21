const schedule = require('node-schedule')
const moment = require('moment')
const mongoose = require('../mongoose')

exports.scheduleCoupon = ()=>{ //定时修改优惠券状态

    const Coupon = mongoose.model('Coupon')

    schedule.scheduleJob('3 * * * * *',()=>{
        console.log('scheduleCronstyle:'+new Date())
        console.log(Coupon)
    });

}

