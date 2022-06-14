import { statusBedrock, status } from 'minecraft-server-util'
import { logger } from '../utils/log'

/**
 * 基岩版没有延迟
 * java版没有游戏模式
 */
const getBeStatus = async (ip: string, port = 19132) => {
  try {
    const res = await statusBedrock(ip, port, {
      enableSRV: false
    })
    return {
      code: 200,
      status: true,
      motd: res.motd.clean,
      motdHtml: res.motd.html,
      max: res.players.max,
      online: res.players.online,
      version: res.version.name,
      // 协议版本
      agreement: res.version.protocol,
      gameMode: res.gameMode
      // name,
      // id
    }
  } catch (e) {
    logger.warn(`${ip}:${port} 状态获取失败`)
    return { code: 200, status: false }
  }
}

const getJeStatus = async (ip: string, port = 25565) => {
  try {
    const res = await status(ip, port, {
      enableSRV: true
    })
    return {
      code: 200,
      status: true,
      motd: res.motd.clean,
      motdHtml: res.motd.html,
      max: res.players.max,
      online: res.players.online,
      // 玩家列表
      sample: res.players.sample,
      version: res.version.name,
      // 协议版本
      agreement: res.version.protocol,
      // 延迟
      roundTripLatency: res.roundTripLatency
    }
  } catch (e) {
    logger.warn(`${ip}:${port} 获取失败`)
    return { code: 200, status: false }
  }
}

export const getServerStatus = (
  type: 'je' | 'be',
  ip: string,
  port: number
): Promise<
  | {
      code: number
      status: boolean
      motd: string
      max: number
      online: number
      version: string
      agreement: number
      sample?: {
        name: string
        id: string
      }[]
    }
  | {
      code: number
      status: boolean
      motd?: undefined
      max?: undefined
      online?: undefined
      version?: undefined
      agreement?: undefined
      sample?: {
        name: string
        id: string
      }[]
    }
> => {
  if (type == 'je') {
    return getJeStatus(ip, port)
  } else if (type == 'be') {
    return getBeStatus(ip, port)
  }
}

export default getServerStatus
export { getJeStatus, getBeStatus }