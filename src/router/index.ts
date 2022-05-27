import { Router } from 'express'
import getStatus from './public/getStatus'

const router = Router()

router.use('/getStatus', getStatus)

export default router