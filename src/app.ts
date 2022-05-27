import express from 'express'
import config from './utils/config'
import { logger } from './utils/log'
import './service/crontab'

const app = express()

app.get(config.baseUrl, (req, res) => {
  res.send('service status ok')
})

app.listen(config.port, () => {
  logger.info(`http://localhost:${config.port}`)
})