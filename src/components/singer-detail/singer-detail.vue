// 歌手详细页面
<template>
  <transition name="slide">
    <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import musicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getDetail()
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSong(res.data.list)
        }
      })
    },
    _normalizeSong(songList) {
      if (!songList) return
      let ret = []
      songList.forEach((item) => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
      // return songList.map(item => {
      //   if (item.musicData.songid && item.musicData.albummid) {
      //     return createSong(item.musicData)
      //   }
      // }).filter((item) => {
      //   return item
      // })
    }
  },
  components: {
    musicList
  }
}
</script>

<style scoped lang="stylus">
  .singer-detail
    position: fixed
    top: 0
    width: 100%
    height: 100%
    z-index: 100
    background: #333
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
