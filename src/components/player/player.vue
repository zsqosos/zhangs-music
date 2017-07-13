<template>
  <div class="player">
    <div v-show="fullScreen" class="normal-player">
      <div class="background">
        <img height="100%" width="100%" :src="dsa">
      </div>
      <div class="top">
        <div class="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="currentSong.name"></h1>
        <h1 class="subtitle" v-html="currentSong.singer"></h1>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd">
              <img class="image" :src="currentSong.image">
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="play-lyric">{{}}</div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="dot-wrapper">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div class="progress-wrapper">
          <span class="time time-l"></span>
          <div class="progress-bar-wrapper">

          </div>
          <span class="time time-r"></span>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i :class="iconMode"></i>
          </div>
          <div class="icon i-left">
            <i class="icon-prev"></i>
          </div>
          <div class="icon i-center">
            <i :class="iconMode"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-not-favorite icon"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mini-player">
      <div class="icon">
        <img src="" width="40" height="40">
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p class="desc" v-html="currentSong.singer"></p>
      </div>
      <div class="control"></div>
      <div class="control">
        <i class="icon-playlist"></i>
      </div>
    </div>
    <audio src=""></audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  created() {

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
