import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    needNewCode: 1,
    platform: 'h5',
    g_tk: 394192604,
    uin: 0
  })

  return jsonp(url, data, options)
}

export function getTopSongs(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 394192604,
    uin: 0,
    format: 'jsonp',
    platform: 'h5',
    tpl: 3,
    page: 'detail',
    type: 'top',
    needNewCode: 1,
    topid
  })

  return jsonp(url, data, options)
}
