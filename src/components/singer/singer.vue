<template>
  <div class="singer">
    {{singer}}
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'

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
        console.log(res)
        if (res.code === ERR_OK) {
          this.singer = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .singer
    position: fixed
    top: 88px
    width: 100%
    height: 100%
</style>
