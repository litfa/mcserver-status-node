/*
 * @Author: litfa 
 * @Date: 2022-01-05 20:14:04 
 * @Last Modified by:   litfa 
 * @Last Modified time: 2022-01-05 20:14:04 
 */
const getAllServersStatus = require('./../module/getAllServersStatus')
const router = require('express')()

router.use(async (req, res) => {
  let data = await getAllServersStatus()
  res.send({ code: 200, data: data })
})

module.exports = router