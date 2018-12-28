import axios from 'axios'
import {baseUrl} from '../../utils/config.js'
export default {
  namespaced: true,
  // 重要信息：state 必须是一个函数，
  // 因此可以创建多个实例化该模块,
  state: () => ({
    article: {},
    articleList: []
  }),
  actions: {
    getArticles({commit}) {
      return axios.get(`${baseUrl}/api/articles`).then(data => {
        commit('setArticles', data.data)
      }).catch(err => console.log(err))
    },
    getById({commit}, id) {
      return axios.get(`${baseUrl}/api/article/${id}`).then(data => {
        commit('setArticle', data.data)
      }).catch(err => console.log(err))
    }
  },
  mutations: {
    setArticles(state, data) {
      state.articleList = data
    },
    setArticle(state, data) {
      state.article = data
    }
  }
}