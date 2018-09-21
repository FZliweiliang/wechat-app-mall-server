
const moment = require('moment')
const mongoose = require('../mongoose')
const Coupon = mongoose.model('Coupon')
const schedule = require('node-schedule')

exports.scheduleCronstyle = ()=>{
    schedule.scheduleJob('10 * * * * *',()=>{
        
        console.log('scheduleCronstyle:'+new Date());
    
    });
}

