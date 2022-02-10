/**
 * @Author: litfa
 * @Date: 2022-01-05 17:01:53
 * @LastEditTime: 2022-02-10 15:58:03
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

const getServerStatus = async (type, ip, port) => {
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
        agreement: res.version.protocol
      }
    } catch (e) {
      console.log(e)
      return { code: 200, status: false }

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
        agreement: res.version.protocol
      }
    } catch (e) {
      return { code: 200, status: false }
    }
  }
}

module.exports = { getServerStatus }
