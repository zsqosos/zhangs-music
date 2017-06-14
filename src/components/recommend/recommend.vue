<template>
  <div>
    {{a}}
  </div>
</template>

<script>
import { getRecommend } from '../../api/recommend'
import { ERR_OK } from '../../api/config'

export default {
  data() {
    return {
      a: {}
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          console.log(res)
          this.a = JSON.stringify(res)
        }
      })
    }
  }
}
</script>

<style lang="stylus">

</style>
