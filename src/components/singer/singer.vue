// 歌手组件
<template>
  <div class="singer" ref="singer">
    <list-view @selectedSinger="selectedSinger" :data="singer" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import { Singer } from 'common/js/singer'
import listView from 'base/listview/listview'
import { playListMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'

const HOT_TITLE = '热门'
const HOT_LEN = 10

export default {
  mixins: [playListMixin],
  data() {
    return {
      singer: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    handlePlayList(playList) {
      const bottom = this.playList.length ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectedSinger(singer) {
      this.$router.push(`/singer/${singer.id}`)
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singer = this._formatListData(res.data.list)
        }
      })
    },
    _formatListData(originData) {
      // 将原始歌手数据格式化成创建好的singer类
      let map = {
        hot: {
          title: HOT_TITLE,
          data: []
        }
      }
      originData.forEach((item, index) => {
        if (index < HOT_LEN) {
          map.hot.data.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            data: []
          }
        }
        map[key].data.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 按字母顺序对map进行排序
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (/[a-zA-Z]/.test(val.title)) {
          ret.push(val)
        } else if (val.title === HOT_TITLE) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    listView
  }
}
</script>

<style scoped lang="stylus">
  .singer
    position: fixed
    top: 88px
    width: 100%
    bottom: 0
</style>
