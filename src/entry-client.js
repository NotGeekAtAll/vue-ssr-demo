import Vue from 'vue'
import { createApp } from './app.js'

const { app, store, router } = createApp()


if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__)
}

Vue.mixin({
  // 全局处理像/article/1,/article/2之间跳转
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate触发')
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

router.onReady(() => {
	router.beforeResolve((to, from, next) => {
		const matched = router.getMatchedComponents(to)
		const prevMatched = router.getMatchedComponents(from)

		// 我们只关心非预渲染的组件
		// 所以我们对比它们，找出两个匹配列表的差异组件
		let diffed = false
		const activated = matched.filter((c, i) => {
			return diffed || (diffed = prevMatched[i] !== c)
		})

		if (!activated.length) {
			return next()
		}

		// 这里如果有加载指示器(loading indicator)，就触发

		Promise.all(
			activated.map(c => {
				if (c.asyncData) {
					return c.asyncData({ store, route: to })
				}
			})
		)
			.then(() => {
				// 停止加载指示器(loading indicator)

				next()
			})
			.catch(next)
	})

	app.$mount('#app')
})
// window.onload = function () {
// 	app.$mount('#app')
// }
