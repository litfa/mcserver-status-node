import { Router } from 'express'
import getStatus from './public/getStatus'
import getServers from './public/getServers'
import getServerDetail from './public/getServerDetail'

const router = Router()

router.use('/getStatus', getStatus)
router.use('/getServers', getServers)
router.use('/getServerDetail', getServerDetail)

export default router