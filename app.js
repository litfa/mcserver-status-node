/*
 * @Author: litfa 
 * @Date: 2022-01-05 17:01:56 
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-05 20:12:39
 */
const express = require('express')

global.CONFIG = require('./config.js')()

const app = express()

require('./module/schedule')

app.use('/api/getStatus', require('./router/getStatus.js'))
app.use('/api/getStatusLog', require('./router/getStatusLog'))

app.listen(CONFIG.port, () => {
  // logger.info()
})