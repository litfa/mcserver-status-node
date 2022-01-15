/*
 * @Author: litfa 
 * @Date: 2022-01-05 20:14:04 
 * @Last Modified by:   litfa 
 * @Last Modified time: 2022-01-05 20:14:04 
 */
const getAllServersStatus = require('./../module/getAllServersStatus')
const router = require('express')()

global.cache = {}
global.cache.data = {}

router.use(async (req, res) => {
  // 上次缓存时间 + 需要缓存的时间    > 当前时间
  // 更新缓存
  if (!cache.data.date || cache.data.date + CONFIG.catchTime < Date.now()) {
    logger.info('更新实时数据缓存')
    // 获取数据
    let data = await getAllServersStatus()
    // 将数据存在全局对象
    cache.data = { date: Date.now(), data }
  }
  // 返回全局对象缓存的数据
  res.send({ code: 200, data: cache.data.data })
})

module.exports = router