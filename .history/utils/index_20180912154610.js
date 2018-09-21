const moment = require('moment')
const mongoose = require('../mongoose')
const schedule = require('node-schedule')
exports.scheduleCronstyle = ()=>{
    schedule.scheduleJob('3 * * * * *',()=>{
        console.log('scheduleCronstyle:'+new Date())
        console.log(mongoose)
    
    });
}

