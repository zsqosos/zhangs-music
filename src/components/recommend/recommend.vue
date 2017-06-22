<template>
  <div class="recommend">
    <scroll ref="scrolll" :data="discList">
      <div class="recommend-content">
        <div v-if="recommends.length" class="slider-wrapper">
          <div class="slider-content">
            <slider>
              <div v-for="item in recommends">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" @load="imgLoaded">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌曲推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="avatar-left">
                <img width="60" height="60" :src="item.imgurl" @load="avatarLoaded">
              </div>
              <div class="text-right">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="description" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
        <div class="loading-wrapper" v-show="!discList.length">
          <loading></loading>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import slider from 'base/slider/slider'
import scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    imgLoaded() {
      if (!this.imgChecked) {
        this.$refs.scrolll.refresh()
        console.log('img')
        this.imgChecked = true
      }
    },
    avatarLoaded() {
      if (!this.avatarChecked) {
        this.$refs.scrolll.refresh()
        console.log('avatar')
        this.avatarChecked = true
      }
    }
  },
  components: {
    slider,
    scroll,
    loading
  }
}
</script>

<style lang="stylus">
  @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .avatar-left
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text-right
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .description
              color: $color-text-d
      .loading-wrapper
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
