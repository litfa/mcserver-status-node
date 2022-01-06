/*
 * @Author: litfa 
 * @Date: 2022-01-05 17:01:56 
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-06 23:25:27
 */
// log
global.logger = {}
require('./module/log')

const express = require('express')

logger.info('初始化配置文件')
global.CONFIG = require('./config.js')()

// 开启定时任务
logger.info('开启定时任务')
require('./module/schedule')

logger.info('初始化 express 模块')
const app = express()

app.use('/api/getStatus', require('./router/getStatus.js'))
app.use('/api/getStatusLog', require('./router/getStatusLog'))
app.use('/', express.static('./dist/'))

app.listen(CONFIG.port, () => {
  logger.info(`监听端口 ${CONFIG.port}`)
  logger.info(`http://127.0.0.1:${CONFIG.port}`)
})