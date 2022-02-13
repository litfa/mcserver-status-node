/**
 * @Author: litfa
 * @Date: 2022-01-05 17:01:53
 * @LastEditTime: 2022-02-13 13:00:28
 * @LastEditors: litfa
 * @Description: 获取状态
 * @FilePath: /mcserver-status-node/module/get-server-info-api.js
 * @
 */
const { statusBedrock, status } = require('minecraft-server-util')

let beOption = {
  enableSRV: false
}
let jeOption = {
  enableSRV: true // SRV record lookup
}

const getServerStatus = async (type, ip, port, name, id) => {
  if (type == 'be') {
    try {
      let res = await statusBedrock(ip, port || 19132, beOption)
      console.log('beend')
      return {
        code: 200,
        type: 'be',
        status: true,
        motd: res.motd.clean,
        max: res.players.max,
        online: res.players.online,
        version: res.version.name,
        // 协议版本
        agreement: res.version.protocol,
        name, id
      }
    } catch (e) {
      logger.warning(`${name} id:${id} ${ip}:${port} 获取失败`)
      return { code: 200, status: false, name, id }

    }
  } else if (type == 'je') {
    try {
      let res = await status(ip, port || 25565, jeOption)
      return {
        code: 200,
        type: 'je',
        status: true,
        motd: res.motd.clean,
        max: res.players.max,
        online: res.players.online,
        // 玩家列表
        sample: res.players.sample,
        version: res.version.name,
        // 协议版本
        agreement: res.version.protocol,
        name,
        id
      }
    } catch (e) {
      logger.warning(`${name} id:${id} ${ip}:${port} 获取失败`)
      return { code: 200, status: false, name, id }
    }
  }
}

module.exports = { getServerStatus }
