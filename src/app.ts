import express from 'express'
import config from './utils/config'
import { logger } from './utils/log'
import './service/crontab'
import router from './router'

const app = express()

app.use(config.baseUrl, router)

app.get(config.baseUrl, (req, res) => {
  res.send('service status ok')
})

app.listen(config.port, () => {
  logger.info(`http://localhost:${config.port}`)
})