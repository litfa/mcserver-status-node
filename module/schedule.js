/*
 * @Author: litfa 
 * @Date: 2022-01-05 17:01:51 
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-05 18:17:08
 */
const schedule = require('node-schedule')

schedule.scheduleJob(CONFIG.schedule, () => {
  // for (let i in config.servers) {
  //   // let res = await getServerStatus()

  // }
})