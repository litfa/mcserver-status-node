import { readFileSync } from 'fs'

export default <
  {
    port: number
    baseUrl: string
    mysql: {
      'host': string
      'port': number
      'user': string
      'password': string
      'database': string
    }
  }
>JSON.parse(readFileSync('data/config.json', 'utf8'))