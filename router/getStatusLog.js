/*
 * @Author: litfa 
 * @Date: 2022-01-05 20:13:49 
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-07 00:42:29
 */
const fs = require('fs')
const path = require('path')
const router = require('express')()

let dataLogFilePath = path.join(process.cwd(), './serverLog/log.json')

router.use(async (req, res) => {
  let data = fs.readFileSync(dataLogFilePath)
  data = JSON.parse(data)
  let sliceNum = data.length - CONFIG.viewDataNum
  data = sliceNum < 0 ? data : data.slice(sliceNum)

  res.send({
    code: 200,
    data: data,
    viewNewData: CONFIG.viewNewData || false
  })
})

module.exports = router