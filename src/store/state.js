import { playMode } from 'common/js/config'
import { loadSearch, loadPLay } from 'common/js/cache'

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
  playHistory: loadPLay()
}

export default state
