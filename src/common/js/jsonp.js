import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url = jointUrl(url, data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function jointUrl(url, data) {
  let queryString = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    queryString += `&${k}=${encodeURIComponent(value)}`
  }
  queryString = queryString.substr(1)
  url = url + ((url.indexOf('?') < 0) ? '?' : '&') + queryString
  return url
}
