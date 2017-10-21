import {
  commonParams
} from './config'
import axios from 'axios'

// 从后端代理接口获取歌词数据
export function getLyric(mid) {
  const url = '/api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    g_tk: 5381,
    hostUin: 0,
    loginUin: 0,
    pcachetime: +new Date(),
    platform: 'yqq',
    needNewCode: 0,
    notice: 0,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
