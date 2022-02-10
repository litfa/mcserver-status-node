/**
 * @Author: litfa
 * @Date:  2022-01-05 17:42:18
 * @LastEditTime: 2022-02-10 15:43:52
 * @LastEditors: litfa
 * @Description: 获取所有服务器状态
 * @FilePath: /mcserver-status-node/module/getAllServersStatus.js
 * @
 */
const { getServerStatus } = require('./../module/get-server-info-api')

module.exports = async (config) => {
  let data = []
  for (let i in CONFIG.servers) {
    let item = CONFIG.servers[i]
    let res = await getServerStatus(item.type, item.ip, item.port - 0)
    if (config && config.favicon === false && res.favicon) delete res.favicon
    res.date = Date.now()
    res.name = item.name
    res.id = item.id
    data.push(res)
    // console.log(data)
  }
  return data
}