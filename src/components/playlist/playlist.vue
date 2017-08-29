<template>
  <div class="playlist">
    <div class="list-wrapper">
      <div class="list-header">
        <h1 class="title">
          <i class="icon"></i>
          <span class="text"></span>
          <span class="clear"></span>
        </h1>
      </div>
      <div class="list-content">
        <ul>
          <li class="item">
            <i class="current"></i>
            <span class="text"></span>
            <span class="like">
              <i></i>
            </span>
            <span class="delete">
              <i class="icon-delete"></i>
            </span>
          </li>
        </ul>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-code">
          <span>关闭</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
</style>
