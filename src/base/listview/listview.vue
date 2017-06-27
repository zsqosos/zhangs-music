<template>
  <scroll class="listview" :data="data" ref="scroll">
    <ul>
      <li v-if="data.length" class="group" v-for="group in data" ref="groupList">
        <h2 class="title">{{group.title}}</h2>
        <ul>
          <li class="list-item" v-for="listitem in group.data">
            <img class="avatar" width="50" height="50" v-lazy="listitem.avatar">
            <span class="name">{{listitem.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart">
      <ul>
        <li class="shortcut-item" v-for="(item,index) in shortcut" :data-index="index">{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {

    }
  },
  computed: {
    shortcut() {
      return this.data.map(item => {
        return item.title.substr(0, 1)
      })
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      let touchIndex = getData(e.target, 'index')
      this._scrollTo(touchIndex)
    },
    _scrollTo(index) {
      this.$refs.scroll.scrollToElement(this.$refs.groupList[index], 0)
    }
  },
  components: {
    Scroll
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
        .current
          color: $color-theme
</style>
