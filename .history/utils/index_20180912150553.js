
const moment = require('moment')
const mongoose = require('../mongoose')
const Coupon = mongoose.model('Coupon')
const schedule = require('node-schedule')

exports.scheduleCronstyle = ()=>{
    schedule.scheduleJob('0 0 0 * * *',()=>{
        
        console.log('scheduleCronstyle:'+new Date());
    
    });
}

