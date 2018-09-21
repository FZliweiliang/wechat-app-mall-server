const schedule = require('node-schedule')
const moment = require('moment')
const mongoose = require('../mongoose')

exports.scheduleCoupon = ()=>{ //定时修改优惠券状态

    const Coupon = mongoose.model('Coupon')
    console.log('scheduleCronstyle:'+new Date())
    schedule.scheduleJob('0 0 0 * * *',()=>{
        console.log('scheduleCronstyle:'+new Date())
        Coupon.find()
        .then(result => {
            console.log(result)
            result.map((v,k)=>{
                console.log(moment(v.effective[1],'YYYY-MM-DD').valueOf())
                console.log( moment(new Date(), 'YYYY-MM-DD').valueOf())
            })
            
        })
        .catch(err => {
            console.log(err.toString())
        })
    });

}

