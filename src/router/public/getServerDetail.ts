import { Router } from 'express'
import { query } from '../../utils/db'

const router = Router()

const sql = 'select * from servers where id=?'
router.post('/:id', async (req, res) => {
  const id = req.params.id

  const [err, request] = await query(sql, id)

  if (err) return res.send({ code: 500 })
  res.send({ code: 200, data: request[0] })
})

export default router