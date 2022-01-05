/*
 * @Author: litfa 
 * @Date: 2022-01-05 17:01:51 
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-05 20:13:53
 */
const schedule = require('node-schedule')
const getAllServersStatus = require('./getAllServersStatus')
const fs = require('fs')
const path = require('path')

let dataLogFilePath = path.join(__dirname, '../serverLog/log.json')
schedule.scheduleJob(CONFIG.schedule, async () => {
  let data = await getAllServersStatus({ favicon: false })

  let dataLog = fs.readFileSync(dataLogFilePath)
  dataLog = JSON.parse(dataLog)

  dataLog.push({ date: Date.now(), data })
  fs.writeFileSync(dataLogFilePath, JSON.stringify(dataLog))
})