<template>
  <transition name="slider" class="disc">
    <music-list :title="title" :bg-image="bgImg" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { getDiscDetail } from 'api/recommend'
import { mapGetters } from 'vuex'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getDiscDetail()
  },
  computed: {
    title() {
      return this.discList.dissname
    },
    bgImg() {
      return this.discList.imgurl
    },
    ...mapGetters([
      'discList'
    ])
  },
  methods: {
    _getDiscDetail() {
      if (!this.discList.dissid) {
        this.$router.push('/recommend')
        return
      }
      getDiscDetail(this.discList.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSong(res.cdlist[0].songlist)
        }
      })
    },
    _normalizeSong(songs) {
      if (!songs) {
        return
      }
      let ret = []
      songs.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
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
    transform: translate3d(100%,0,0)
</style>
