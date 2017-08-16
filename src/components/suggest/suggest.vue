<template>
  <scroll :data="result" class="suggest">
    <ul class="suggest-list">
      <li @click="selectSuggestItem(item)" v-for="item in result" class="suggest-item">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
    <div class="no-result-wrapper"></div>
  </scroll>
</template>

<script>
import { getSearch } from 'api/search'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import { createSong } from 'common/js/song'
import { mapMutations, mapActions } from 'vuex'
import { Singer } from 'common/js/singer'

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
      page: 1,
      hasMore: true,
      result: []
    }
  },
  methods: {
    getIconCls(item) {
      return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music'
    },
    getDisplayName(item) {
      return item.type === TYPE_SINGER ? item.singername : `${item.name} - ${item.singer}`
    },
    search() {
      this.page = 1
      this.hasMore = true
      getSearch(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data)
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
        console.log('not a singer')
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
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([

    ])
  },
  watch: {
    query() {
      this.search()
    }
  },
  components: {
    Scroll
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
