const schedule = require('node-schedule')
const moment = require('moment')
const mongoose = require('../mongoose')
const User = mongoose.model('User')
// const Coupon = mongoose.model('Coupon')
exports.scheduleCronstyle = ()=>{
    schedule.scheduleJob('3 * * * * *',()=>{
        console.log('scheduleCronstyle:'+new Date())
    });
}

