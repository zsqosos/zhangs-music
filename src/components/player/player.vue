<template>
  <div class="player">
    <div v-show="fullScreen" class="normal-player">
      播放器
    </div>
    <div class="mini-player"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted() {
    console.log(this.playList)
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playing',
      'playList',
      'sequenceList'
    ])
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

  .player
    .normal-player
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
</style>
