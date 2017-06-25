<template>
  <div class="singer">
    <list-view :data="singer"></list-view>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import { Singer } from 'common/js/singer'
import listView from 'base/listview/listview'

const HOT_TITLE = '热门'
const HOT_LEN = 10

export default {
  data() {
    return {
      singer: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singer = this._formatListData(res.data.list)
        }
      })
    },
    _formatListData(originData) {
      let map = {
        hot: {
          title: HOT_TITLE,
          data: []
        }
      }
      originData.forEach((item, index) => {
        if (index < HOT_LEN) {
          map.hot.data.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            data: []
          }
        }
        map[key].data.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
      })
      // 对map进行排序
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
    }
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
