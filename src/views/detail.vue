<template>
  <div>
    <h1 v-text="article.title"></h1>
    <div class="ar" v-text="article.content"></div>
    <router-link :to="{name: 'detail', params: {id: 2}}">跳转至id为2的article，触发beforeRouteUpdate，可在console里看到</router-link>
  </div>
</template>


<script>
export default {
  asyncData({store, route}) {
    return store.dispatch('article/getById', route.params.id)
  },
  mounted() {},
  computed: {
    article() {
      return this.$store.state.article.article
    }
  }
}
</script>

<style lang="less">
  .ar {
    color: green;
  }
</style>


