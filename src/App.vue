<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import tab from 'components/tab/tab'
export default {
  components: {
    MHeader,
    tab
  }
}
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable.styl'
  #app
    color: $color-theme
</style>
