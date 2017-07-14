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
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position: absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align:　center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

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
