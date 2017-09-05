import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_HISTORY = 15
const PLAY_KEY = '__play__'
const PLAY_MAX_HISTORY = 20

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

function deleteFromArr(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, item => {
    return item === query
  }, SEARCH_MAX_HISTORY)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArr(searches, item => item === query)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function savePlay(song) {
  let play = storage.get(PLAY_KEY, [])
  insertArray(play, song, item => {
    return item.id === song.id
  }, PLAY_MAX_HISTORY)
  storage.set(PLAY_KEY, play)
  return play
}

export function loadPLay() {
  console.log(storage.get(PLAY_KEY, []))
  return storage.get(PLAY_KEY, [])
}
