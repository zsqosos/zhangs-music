var express = require('express')
var compression = require('compression')
var axios = require('axios')

var app = express()
var port = process.env.PORT || 8001

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(e => {
    console.log(e)
  })
})

apiRoutes.get('/getDiscDetail', function (req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(e => {
    console.log(e)
  })
})

apiRoutes.get('/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var dataString = reg.exec(ret)
      if(dataString) {
        ret = JSON.parse(dataString[1])
      }
    }
    res.json(ret)
  }).catch(e => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)
app.use(compression())
app.use(express.static('./dist'))

app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('listen at http://localhost:' + port + '\n')
})
