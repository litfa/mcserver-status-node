import { Router } from 'express'
import { query } from '../../utils/db'

const router = Router()

const sql = `
select
    date,
    status,
    max,
    online
from status
where date > date_sub(now(), interval ? hour)
order by date desc
limit 36
`

// 6h 24h 7d 30d
router.post('/6h', async (req, res) => {
  const [err, request] = await query(sql, 6)
  if (err) return res.send({ code: 500 })
  res.send({ code: 200, data: request })
})

router.post('/24h', async (req, res) => {
  const [err, request] = await query(sql, 24)
  if (err) return res.send({ code: 500 })
  res.send({ code: 200, data: request })
})

// 展示近七天 最高人数 平均人数 可用率
router.post('/7d', async (req, res) => {
  const sql = `
  select
  #      按天查询
         date_format(date, '%Y-%m-%d') day,
  #      可用率
         avg(status) as status,
  #      峰值
         max(online) as max_online,
  #      平均
         avg(online) as online
  from status
  where date > date_sub(now(), interval 7 day)
  group by date_format(date, '%Y-%m-%d')
  order by date desc
  `
  const [err, request] = await query(sql)
  if (err) return res.send({ code: 500 })
  res.send({ code: 200, data: request })
})

export default router