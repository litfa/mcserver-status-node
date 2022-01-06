/*
 * @Author: litfa 
 * @Date: 2022-01-05 17:01:53 
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-06 01:30:41
 */
const axios = require('axios')

const getServerStatus = async (type, ip, port) => {
  if (type == 'be') {
    let res = {}
    try {
      res = await axios({
        method: 'GET',
        url: 'https://motdbe.blackbe.xyz/api',
        params: {
          host: `${ip}:${port}`
        }
      })
    } catch (e) {
      return { code: e.response.status }
    }
    res = res.data
    return {
      code: 200,
      type: 'be',
      status: res.online,
      status: res.status,
      motd: res.motd,
      max: res.max,
      online: res.online,
      version: res.version,
      // 协议版本
      agreement: res.agreement
    }
  } else if (type == 'je') {
    let res = {}
    try {
      res = await axios({
        method: 'GET',
        url: 'https://mcapi.us/server/status',
        params: {
          ip: ip,
          port: port
        }
      })
    } catch (e) {
      // console.log(e);
      return { code: e.response.status }
    }
    res = res.data
    return {
      code: 200,
      type: 'je',
      status: res.online,
      motd: res.motd,
      // 图标
      favicon: res.favicon,
      max: res.players.max,
      online: res.players.now,
      // 玩家列表
      sample: res.players.sample,
      version: res.server.name,
      // 协议版本
      agreement: res.server.protocol
    }
  }
}

module.exports = { getServerStatus }
