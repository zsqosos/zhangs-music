<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box @query="changeQuery" ref="searchBox"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll ref="shortcut" :refreshDelay="refreshDelay" :data="shortcut" class="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="setQuery(item.k)" class="item" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @select="addQuery" @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" ref="searchResult" v-show="query">
      <suggest @listScroll="blurInput" ref="suggest" @select="saveSearch" :query="query"></suggest>
    </div>
    <confirm ref="confirm" text="是否清空搜索历史？" confirmBtnText="清空" @confirm="clearHistory"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import { playListMixin } from 'common/js/mixin'
import { mapActions, mapGetters } from 'vuex'
import SearchList from 'base/search-list/search-list'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'

export default {
  mixins: [playListMixin],
  data() {
    return {
      hotKey: [],
      query: '',
      refreshDelay: 120
    }
  },
  created() {
    this._getHotKey()
  },
  computed: {
    shortcut() {
      return this.hotKey.concat(this.searchHistory)
    },
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length ? '60px' : ''

      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()

      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()
    },
    setQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    changeQuery(query) {
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    addQuery(item) {
      this.$refs.searchBox.setQuery(item)
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearHistory'
    ])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
          console.log(1)
        }, 20)
      }
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  }

}
</script>

<style lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
