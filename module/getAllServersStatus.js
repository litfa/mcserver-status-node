/**
 * @Author: litfa
 * @Date:  2022-01-05 17:42:18
 * @LastEditTime: 2022-02-13 15:34:56
 * @LastEditors: litfa
 * @Description: 获取所有服务器状态
 * @FilePath: /mcserver-status-node/module/getAllServersStatus.js
 * @
 */
const { getServerStatus } = require('./../module/get-server-info-api')

module.exports = async () => {
  let data = []
  let task = []
  for (let i in CONFIG.servers) {
    let item = CONFIG.servers[i]
    task.push(getServerStatus(item.type, item.ip, item.port - 0, item.name, item.id))
  }
  await Promise.all(task).then(values => {
    for (let i in values) {
      values[i].date = Date.now()
      data.push(values[i])
    }
  })
  return data
}