import { playMode } from 'common/js/config'
import { loadSearch, loadPLay, loadFavorite } from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  discList: [],
  topList: [],
  searchHistory: loadSearch(),
  playHistory: loadPLay(),
  favoriteList: loadFavorite()
}

export default state
