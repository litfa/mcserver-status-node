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
`

// 6h 24h 7d 30d
router.post('/6h', async (req, res) => {
  const [err, request] = await query(sql, 6)
  if (err) return res.send({ code: 500 })
  res.send({ code: 200, data: request })
})

export default router