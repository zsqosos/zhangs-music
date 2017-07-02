export default class Song {
  constructor({id, mid, name, img, singer, album, duration, url}) {
    this.id = id
    this.mid = mid
    this.name = name
    this.img = img
    this.singer = singer
    this.album = album
    this.duration = duration
    this.url = url
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    name: musicData.songname,
    singer: filterSinger(musicData.singer),
    album: musicData.albumname,
    duration: musicData.interval,
    img: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

function filterSinger(singer) {
  let result = []
  if (!singer) {
    return ''
  }
  singer.forEach(item => {
    result.push(item.name)
  })
  return result.join('/')
}
