const getAllServersStatus = require('./../module/getAllServersStatus')
const router = require('express')()

router.use(async (req, res) => {
  let data = await getAllServersStatus()
  res.send({ code: 200, data: data })
})

module.exports = router