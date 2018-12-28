<template>
  <div>
    <h4 class="my-ar">文章列表</h4>
    <ul>
      <router-link v-for="item in articleList" :key="item.id" tag="li" :to="{name: 'detail', params: {id: item.id}}" v-text="item.title">
      </router-link>
    </ul>
  </div>
</template>

<script>
// import ArticleModule from '../store/modules/article.js'
export default {
  name: 'art',
  asyncData({store, route}) {
    // if (!store.state.article) store.registerModule('article', ArticleModule)
    return store.dispatch('article/getArticles')
  },
  computed: {
    articleList () {
      return this.$store.state.article.articleList
    }
  }
}
</script>

<style lang="less">
  .my-ar {
    color: blue;
  }
</style>


