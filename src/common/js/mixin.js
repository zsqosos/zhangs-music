import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

// mini播放器存在时，滚动重新计算
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  methods: {
    handlePlayList() {
      throw new Error('component must implement handlePlayList method')
    }
  },
  watch: {
    playList(newVal) {
      this.handlePlayList(newVal)
    }
  }
}

// player组件与playlist组件公用的逻辑
export const playerMixin = {
  computed: {
    // 播放模式图标
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'mode',
      'playList',
      'sequenceList',
      'currentSong',
      'currentIndex',
      'playing'
    ])
  },
  methods: {
    // 改变播放模式
    changeMode() {
      let mode = (this.mode + 1) % 3
      let list = null
      this.setPlayMode(mode)
      if (this.mode === playMode.random) {
        list = shuffle(this.playList)
      } else {
        list = this.sequenceList
      }
      // 避免切换播放模式后，当前歌曲发生变化，需在更改播放列表后，重新计算当前歌曲在新列表中的索引值
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENTINDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayingState: 'SET_PLAYING_STATE',
      setPlayList: 'SET_PLAYLIST'
    })
  }
}

// add-song与search组件公用逻辑
export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    // 设置搜索框内容
    setQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    // 输入框搜索词改变时重新设置当前query
    changeQuery(query) {
      this.query = query
    },
    // 滑动时取消输入框焦点，键盘关闭
    blurInput() {
      this.$refs.searchBox.blur()
    },
    // 保存搜索结果
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
