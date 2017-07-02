<template>
  <div class="music-list"></div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
