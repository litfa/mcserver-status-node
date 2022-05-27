import config from './../utils/config'
import { CronJob } from 'cron'
import { getServerStatus } from '../minecraft/getServerStatus'
import { query } from './../utils/db'
import { logger } from '../utils/log'
import sleep from '../utils/sleep'
;(async () => {
  const [err, request]: [
    any,
    {
      id: number
      name: string
      host: string
      port: number
      type: 'je' | 'be'
      user_id: number
      status: number
    }[]
  ] = await query('select * from servers where status=1')

  if (err) return logger.error('服务器列表获取失败')

  request.forEach(async (e) => {
    // 为防止同一时间过多请求 随机生成10分钟内的延迟
    const timeout = Math.random() * 60 * 10 * 1000
    new CronJob(
      '*/10 * * * *',
      async () => {
        // 等待延迟
        await sleep(timeout)
        const data = await getServerStatus(e.type, e.host, e.port)
        const [err, request] = await query('insert into status set ?', {
          ...data,
          sample: data.sample ? JSON.stringify(data.sample) : null,
          date: new Date(),
          id: e.id
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
})()