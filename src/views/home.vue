<template>
  <div>
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title" v-text="'我叫：' + userInfo.name"></h5>
        <h5 class="card-title" v-text="'我是：' + userInfo.sex"></h5>
        <p class="card-text" v-text="'我今年' + userInfo.age+'岁'"></p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  asyncData({ store }) {
    return store.dispatch('getUserInfo')
  },
  mounted() {},
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style lang="less">
</style>


