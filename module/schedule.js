/**
 * @Author: litfa
 * @Date: 2022-02-10 11:42:49
 * @LastEditTime: 2022-02-13 15:34:54
 * @LastEditors: litfa
 * @Description: 定时获取
 * @FilePath: /mcserver-status-node/module/schedule.js
 * @
 */
const schedule = require('node-schedule')
const getAllServersStatus = require('./getAllServersStatus')
const fs = require('fs')
const path = require('path')

let dataLogFilePath = path.join(process.cwd(), './serverLog/log.json')
schedule.scheduleJob(CONFIG.schedule, async () => {
  logger.info('开始获取数据')
  let data = await getAllServersStatus({ favicon: false })

  let dataLog = fs.readFileSync(dataLogFilePath)
  dataLog = JSON.parse(dataLog)

  dataLog.push({ date: Date.now(), data })
  // 移除多余数据
  if (dataLog.length > CONFIG.storeDataNum && CONFIG.storeDataNum != -1) {
    dataLog = dataLog.slice(dataLog.length - CONFIG.storeDataNum)
  }
  fs.writeFileSync(dataLogFilePath, JSON.stringify(dataLog))
  logger.info('获取完成')
})