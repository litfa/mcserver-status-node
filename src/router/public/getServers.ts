import { Router } from 'express'
import { query } from '../../utils/db'

const router = Router()

const sql = `
select
  servers.*,
  servers.type,
  status.online,
  status.max_online,
  if(servers.type = 'be', status.version, null) as version
from servers
left join (
  select
    # 峰值
    max(online) as max_online,
    # 平均
    avg(online) as online,
    version,
    id
  from status
  where
    date > date_sub(now(), interval 7 day)
  group by id
) status on status.id = servers.id
where
    servers.type=? or servers.type=?
group by servers.id
`
router.post('/:type', async (req, res) => {
  const type = req.params.type
  let err, request
  if (type === 'je') {
    // pretter 这里会加一个分号 导致eslint报错
    // eslint-disable-next-line
    ;[err, request] = await query(sql, ['je', 'je'])
  } else if (type === 'be') {
    // eslint-disable-next-line
    ;[err, request] = await query(sql, ['be', 'be'])
  } else if (type === 'all') {
    // eslint-disable-next-line
    ;[err, request] = await query(sql, ['je', 'be'])
  } else {
    return res.send({ code: 403, msg: '参数有误' })
  }

  if (err) return res.send({ code: 500 })
  res.send({ code: 200, data: request })
})

export default router