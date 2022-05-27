import config from './../utils/config'
import { CronJob } from 'cron'
import { getServerStatus } from '../minecraft/getServerStatus'
import { query } from './../utils/db'
import { logger } from '../utils/log'

config.getServerStatus.forEach(async (e) => {
  new CronJob(
    e.crontab,
    async () => {
      const data = await getServerStatus(e.type, e.host, e.port)
      if (data.sample) {
        // data.sample = JSON.stringify(data.sample)
      }
      const [err, request] = await query('insert into status set ?', {
        ...data,
        sample: data.sample ? JSON.stringify(data.sample) : null,
        date: new Date(),
        id: e.key
      })
      if (err) {
        logger.error('状态插入失败')
      }
    },
    null,
    true,
    'Asia/Shanghai'
  )
})