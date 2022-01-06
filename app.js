/*
 * @Author: litfa 
 * @Date: 2022-01-05 17:01:56 
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-07 00:50:00
 */
const fs = require('fs')
const path = require('path')
// log
global.logger = {}
require('./module/log')

logger.info('初始化配置文件')
if (!fs.existsSync('./config.js')) {
  logger.info('未找到配置文件， 将生成默认配置')
  // 生成配置文件
  try {
    fs.writeFileSync('./config.js', require('./module/init/config-init'))
  } catch (e) {
    logger.error('配置文件生成失败', e)
  }
  logger.info('配置文件生成成功')
  logger.warning('请将配置文件修改为自己的服务器，并重启该应用(config.js)')
}

if (!fs.existsSync('./serverLog/log.json')) {
  logger.info('未检测到日志文件，将自动生成')
  if (!fs.existsSync('./serverLog/')) fs.mkdirSync('./serverLog')
  fs.writeFileSync('./serverLog/log.json', '[]')
  logger.info('日志文件生成成功')
}

const express = require('express')

global.CONFIG = require(path.join(process.cwd(), './config.js'))()

// 开启定时任务
logger.info('开启定时任务')
require('./module/schedule')

logger.info('初始化 express 模块')
const app = express()

app.use('/api/getStatus', require('./router/getStatus.js'))
app.use('/api/getStatusLog', require('./router/getStatusLog'))
app.use('/', express.static(path.join(__dirname, './dist/')))

app.listen(CONFIG.port, () => {
  logger.info(`监听端口 ${CONFIG.port}`)
  logger.info(`http://127.0.0.1:${CONFIG.port}`)
})