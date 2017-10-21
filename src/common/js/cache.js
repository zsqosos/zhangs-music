import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_HISTORY = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_HISTORY = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

// 将一个元素插入数组首位，compare为一个比较函数
function insertArray(arr, val, compare, maxLength) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLength && arr.length > maxLength) {
    arr.pop()
  }
}

// 删除特定元素，compare为一个比较函数
function deleteFromArr(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 将搜索结果存入localStorage
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, item => {
    return item === query
  }, SEARCH_MAX_HISTORY)
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 从localStorage载入搜索数据
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 从localStorage删除指定的搜索数据
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArr(searches, item => item === query)
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 清空localStorage内的搜索数据
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 将播放历史存入localStorage
export function savePlay(song) {
  let play = storage.get(PLAY_KEY, [])
  insertArray(play, song, item => {
    return item.id === song.id
  }, PLAY_MAX_HISTORY)
  storage.set(PLAY_KEY, play)
  return play
}

// 从localStorage载入播放历史数据
export function loadPLay() {
  return storage.get(PLAY_KEY, [])
}

// 将标记喜欢的歌曲存入localStorage
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, item => {
    return item.id === song.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 从localStorage删除指定的喜欢歌曲数据
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArr(songs, item => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 从localStorage载入播放喜欢歌曲数据
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
