/*
 * @Author: litfa 
 * @Date: 2022-01-05 17:42:18 
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-05 19:55:00
 */
const { getServerStatus } = require('./../module/get-server-info-api')

module.exports = async (config) => {
  let data = []
  for (let i in CONFIG.servers) {
    let item = CONFIG.servers[i]
    let res = await getServerStatus(item.type, item.ip, item.port)
    if (config && config.favicon === false && res.favicon) delete res.favicon
    data.push(res)
    // console.log(data)
  }
  return data
}