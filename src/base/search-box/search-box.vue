// 带按钮的搜索框组件
<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input v-model="query" class="box" :placeholder="placeholder" ref="query">
    <i @click="clear" v-show="query.length" class="icon-dismiss"></i>
  </div>
</template>

<script>
import { debounce } from 'common/js/util'

export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(query) {
      this.query = query
    },
    blur() {
      this.$refs.query.blur()
    }
  },
  created() {
    // 截流  函数防抖，200毫秒内只触发一次
    this.debounce = debounce((newValue) => {
      this.$emit('query', newValue)
    }, 200)

    // 使用vm.$watch回调的方式
    // this.$watch('query', debounce((newValue) => {
    //   console.log(2)
    //   this.$emit('query', newValue)
    // }, 200))
  },
  watch: {
    query(newValue) {
      this.debounce(newValue)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      outline: 0
      &::placeholder
        color:  $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
