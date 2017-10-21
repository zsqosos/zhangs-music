// 滚动组件，对better-scroll的封装
<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'

// const DIRECTION_H = 'horizontal'
// const DIRECTION_V = 'vertical'

export default {
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 1
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      dafault: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
    // direction: {
    //   type: String,
    //   default: DIRECTION_V
    // }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, this.refreshDelay)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.scroll) {
        return
      }
      this.scroll = new Bscroll(this.$refs.scroll, {
        probeType: this.probeType,
        click: this.click
        // eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
      })

      if (this.listenScroll) {
        let _this = this
        this.scroll.on('scroll', (pos) => {
          _this.$emit('scroll', pos)
        })
      }

      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // 距离最大滚动距离50px时,触发滚动结束事件
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    // 启用滑动
    disable() {
      this.scroll && this.scroll.disable()
    },
    // 禁止滑动
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
