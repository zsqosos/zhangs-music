<template>
  <scroll :data="result" class="suggest" ref="suggest" :pullup="pullup" :beforeScroll="beforeScroll" @beforeScroll="listScroll" @scrollToEnd="search">
    <ul class="suggest-list">
      <li @click="selectSuggestItem(item)" v-for="item in result" class="suggest-item">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" text=""></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore&&!result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import { getSearch } from 'api/search'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import { createSong } from 'common/js/song'
import { mapMutations, mapActions } from 'vuex'
import { Singer } from 'common/js/singer'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'

const perpage = 20
const TYPE_SINGER = 'singer'

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 0,
      hasMore: true,
      result: [],
      beforeScroll: true,
      pullup: true
    }
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh()
    },
    getIconCls(item) {
      return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music'
    },
    getDisplayName(item) {
      return item.type === TYPE_SINGER ? item.singername : `${item.name} - ${item.singer}`
    },
    search() {
      if (!this.hasMore) {
        return
      }
      this.page++
      getSearch(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(res.data))
          this._checkMore(res.data)
        }
      })
    },
    selectSuggestItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({ path: `/search/${singer.id}` })
        this.setSinger(singer)
      } else {
        this.insertSong({
          song: item
        })
        this.$emit('select', item)
      }
    },
    listScroll() {
      this.$emit('listScroll')
    },
    _checkMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + (song.curpage - 1) * perpage) >= song.totalnum) {
        this.hasMore = false
      }
    },
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
      }
      if (data.song) {
        ret = ret.concat(this._normalizeData(data.song.list))
      }
      return ret
    },
    _normalizeData(data) {
      let ret = []
      data.forEach(item => {
        if (item.songid && item.albumid) {
          ret.push(createSong(item))
        }
      })
      return ret
    },
    _reInitData() {
      this.page = 0
      this.result = []
      this.hasMore = true
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        return
      }
      this._reInitData()
      this.search(newQuery)
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrapper()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
