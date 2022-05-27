import express from 'express'
import config from './utils/config'
import { logger } from './utils/log'
import './service/crontab'
import router from './router'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

// 跨域
app.use(cors())

// req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// router
app.use(config.baseUrl, router)

app.get(config.baseUrl, (req, res) => {
  res.send('service status ok')
})

app.listen(config.port, () => {
  logger.info(`http://localhost:${config.port}`)
})