import { Router } from 'express'
import { query } from '../../utils/db'
import { getBeStatus, getJeStatus } from '../../minecraft/getServerStatus'

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
router.post('/*', async (req, res, next) => {
  const id = req.body.id
  if (id === undefined || typeof id != 'number') {
    return res.send({ code: 403, msg: '参数有误' })
  }

  const [err, offset] = await query('select offset from servers where id=?', id)
  if (err) return res.send({ code: 500 })

  // @ts-ignore
  res.offset = offset[0]?.offset || 0

  next()
})

// 6h 24h 7d 30d
router.post('/6h', async (req, res) => {
  const id = req.body.id
  const [err, request] = await query(sql, [6, id])
  if (err) return res.send({ code: 500 })
  // @ts-ignore
  res.send({ code: 200, data: request, offset: res.offset || 0 })
})

router.post('/24h', async (req, res) => {
  const id = req.body.id
  const [err, request] = await query(sql, [24, id])
  if (err) return res.send({ code: 500 })
  // @ts-ignore
  res.send({ code: 200, data: request, offset: res.offset || 0 })
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
  // @ts-ignore
  res.send({ code: 200, data: request, offset: res.offset || 0 })
})

router.post('/now', async (req, res) => {
  const id = req.body.id
  const sql = 'select host, port, type from servers where id=?'
  const [err, request] = await query(sql, id)
  if (err) {
    return res.send({ status: 500 })
  }
  if (request.length === 0) {
    return res.send({ status: 403, msg: '服务器不存在' })
  }
  let status
  if (request[0].type === 'je') {
    status = await getJeStatus(request[0].host, request[0].port)
  } else if (request[0].type === 'be') {
    status = await getBeStatus(request[0].host, request[0].port)
  }
  res.send({
    status: 200,
    data: { ...status, date: new Date() },
    // @ts-ignore
    offset: res.offset || 0
  })
})

export default router