<template>
  <transition name="slider" class="top-list">
    <music-list :rank="rank" :songs="songs" :title="title" :bgImage="bgImg"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getTopSongs } from 'api/rank'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  created() {
    if (!this.topList.id) {
      this.$router.push('/rank')
    }
    this._getTopSongs()
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImg() {
      if (this.songs.length) {
        return this.songs[0].img
      }
      return ''
    },
    ...mapGetters([
      'topList'
    ])
  },
  methods: {
    _getTopSongs() {
      getTopSongs(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSong(res.songlist)
        }
      })
    },
    _normalizeSong(songList) {
      let ret = []
      songList.forEach((item) => {
        if (item.data.songid && item.data.albumid) {
          ret.push(createSong(item.data))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
  .slider-enter-active, .slider-leave-active
    transition: all 0.3s
  .slider-enter, .slider-leave-to
    transform: translate3d(100%, 0, 0)
</style>
