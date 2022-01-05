/*
 * @Author: litfa 
 * @Date: 2022-01-05 17:01:56 
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-05 18:16:53
 */
const express = require('express')

global.CONFIG = require('./config.js')()

const app = express()

app.use('/api/getStatus', require('./router/getStatus.js'))

app.listen(CONFIG.port, () => {
  // logger.info()
})