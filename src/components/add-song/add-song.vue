<template>
  <transition name="slide">
    <div v-show="showFlag" class="add-song" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">

      </div>
      <div class="shortcut">
        <div class="list-wrapper">
          <div class="list-scroll">
            <div class="list-inner">

            </div>
          </div>
          <div class="list-scroll">
            <div class="list-inner">

            </div>
          </div>
        </div>
      </div>
      <div class="search-result">

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 0
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme
</style>
