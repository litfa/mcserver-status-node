import { Router } from 'express'
import { query } from '../../utils/db'

const router = Router()

const sql = `
select
    id,
    date,
    status,
    motd,
    max,
    online
from status
where
    date > date_sub(now(), interval ? hour)
    and
    id=?
order by date
limit 144
`

// 验证id参数
router.post('/*', (req, res, next) => {
  const id = req.body.id
  if (id === undefined || typeof id != 'number') {
    return res.send({ code: 403, msg: '参数有误' })
  }
  next()
})

// 6h 24h 7d 30d
router.post('/6h', async (req, res) => {
  const id = req.body.id
  const [err, request] = await query(sql, [6, id])
  if (err) return res.send({ code: 500 })
  res.send({ code: 200, data: request })
})

router.post('/24h', async (req, res) => {
  const id = req.body.id
  const [err, request] = await query(sql, [24, id])
  if (err) return res.send({ code: 500 })
  res.send({ code: 200, data: request })
})

// 展示近七天 最高人数 平均人数 可用率
router.post('/7d', async (req, res) => {
  const id = req.body.id
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
  where
      date > date_sub(now(), interval 7 day)
      and
      id=?
  group by date_format(date, '%Y-%m-%d')
  order by date
  `
  const [err, request] = await query(sql, id)
  if (err) return res.send({ code: 500 })
  res.send({ code: 200, data: request })
})

export default router