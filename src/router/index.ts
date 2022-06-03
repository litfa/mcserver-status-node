import { Router } from 'express'
import getStatus from './public/getStatus'
import getServers from './public/getServers'

const router = Router()

router.use('/getStatus', getStatus)
router.use('/getServers', getServers)

export default router