
const schedule = require('node-schedule')
const moment = require('moment')
const mongoose = require('../mongoose')
const Coupon = mongoose.model('Coupon')


exports.scheduleCronstyle = ()=>{
    schedule.scheduleJob('0 0 0 * * *',()=>{
        
        console.log('scheduleCronstyle:'+new Date());
    
    });
}

