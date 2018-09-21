const moment = require('moment')
const mongoose = require('mongoose')
const schedule = require('node-schedule')
console.log(mongoose)
exports.scheduleCronstyle = ()=>{
    schedule.scheduleJob('10 * * * * *',()=>{
        
        console.log('scheduleCronstyle:'+new Date())
    
    });
}

