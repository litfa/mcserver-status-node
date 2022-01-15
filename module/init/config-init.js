module.exports = `module.exports = () => {
  return {
    // 监听端口
    port: 3000,
    // 服务器列表，可自行添加或移除
    servers: [{
      // 服务器名字，将展示给用户
      name: '一个je服',
      // 唯一id，不能重复，若修改 后续数据将识别为全新的服务器
      id: 1,
      // 服务器类型（je 或 be）
      type: 'je',
      // 服务器ip
      ip: 'play.mcxing.cn',
      // 服务器端口
      port: '25565'
    },
    {
      name: '一个be服',
      id: 2,
      type: 'be',
      ip: 'play.mcxing.cn',
      port: '19132'
    }],

    // 间隔表达式（定时查询服务器状态）
    // 获取状态使用第三方api （module/get-server-info-api.js）,请勿设置过高的频率
    // * 0 */5 * * * * 为 10 分钟执行一次
    // 若不会填写，可前往 https://cron.qqe2.com/ 在线生成
    //     *    *    *    *    *    *
    //     ┬    ┬    ┬    ┬    ┬    ┬
    //     │    │    │    │    │    │
    //     │    │    │    │    │    └  周（0-7）（0或7为周日）
    //     │    │    │    │    └───── month (1 - 12) 月（1-12）
    //     │    │    │    └────────── day of month (1 - 31) 日（1-31）
    //     │    │    └─────────────── hour (0 - 23) 小时（0-23）
    //     │    └──────────────────── minute (0 - 59) 分（0-59）
    //     └───────────────────────── second (0 - 59, OPTIONAL) 秒（0-59）
    schedule: '0 */10 * * * *',
    // 展示的数据数量
    viewDataNum: 20,
    // 保留的数据数量（多余的将被删除）
    // 设置为 -1 时 保留所有数据
    storeDataNum: 50,
    // 实时数据
    viewNewData: true
  }
}`