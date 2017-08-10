<template>
  <scroll class="listview" :data="data" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll" ref="scroll">
    <ul>
      <li v-if="data.length" class="group" v-for="group in data" ref="groupList">
        <h2 class="title">{{group.title}}</h2>
        <ul>
          <li class="list-item" v-for="listitem in group.data" @click="selectSinger(listitem)">
            <img class="avatar" width="50" height="50" v-lazy="listitem.avatar">
            <span class="name">{{listitem.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove="onShortcutTouchMove">
      <ul>
        <li class="shortcut-item" :class="{current:currentIndex===index}" v-for="(item,index) in shortcut" :data-index="index">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div class="loading-wrapper" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'
import loading from 'base/loading/loading'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  created() {
    this.listenScroll = true
    this.probeType = 3
    this.listHeight = []
  },
  computed: {
    shortcut() {
      return this.data.map(item => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY < 0) return
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    selectSinger(singer) {
      this.$emit('selectedSinger', singer)
    },
    onShortcutTouchStart(e) {
      let data = getData(e.target, 'index')
      if (!data) return
      this.touchStartIndex = parseInt(data)
      this.scrollStartY = e.touches[0].clientY
      this.currentIndex = this._restrictIndex(this.touchStartIndex)
      this._scrollTo(this.currentIndex)
    },
    onShortcutTouchMove(e) {
      let nowTouchY = e.touches[0].pageY
      let delta = nowTouchY - this.scrollStartY
      let nowTouchIndex = this.touchStartIndex + Math.floor(delta / ANCHOR_HEIGHT)
      this.currentIndex = this._restrictIndex(nowTouchIndex)
      this._scrollTo(this.currentIndex)
    },
    scroll(data) {
      this.scrollY = -data.y
    },
    refresh() {
      this.$refs.scroll.refresh()
    },
    _restrictIndex(index) {
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      return index
    },
    _scrollTo(index) {
      this.$refs.scroll.scrollToElement(this.$refs.groupList[index], 0)
    },
    _calcHeight() {
      let listItemHeight = 0
      let listItem = this.$refs.groupList
      this.listHeight.push(0)
      for (let i = 0; i < listItem.length; i++) {
        listItemHeight += listItem[i].clientHeight
        this.listHeight.push(listItemHeight)
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calcHeight()
      }, 20)
    },
    scrollY() {
      let listHeight = this.listHeight
      for (let i = 0; i < listHeight.length - 1; i++) {
        let heightBottom = listHeight[i]
        let heightTop = listHeight[i + 1]
        if (this.scrollY >= heightBottom && this.scrollY < heightTop) {
          this.diff = heightTop - this.scrollY
          this.currentIndex = i
          return
        }
      }
    },
    diff(diff) {
      let moveY = (diff < TITLE_HEIGHT && diff > 0) ? diff - TITLE_HEIGHT : 0
      if (this.moveY === moveY) {
        return
      }
      this.moveY = moveY
      this.$refs.fixed.style.transform = `translate3d(0, ${moveY}px, 0)`
    }
  },
  components: {
    Scroll,
    loading
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .group
      padding-bottom: 30px
      .title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .shortcut-item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
